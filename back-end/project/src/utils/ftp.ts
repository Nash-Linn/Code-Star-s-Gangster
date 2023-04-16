import * as ftp from 'ftp';
import * as path from 'path';
import * as fs from 'fs';
import ftpConfig from 'src/config/ftpConfig';

const config = ftpConfig.config_pro;

export function ftpConnect(): Promise<any> {
  return new Promise((resolve, reject) => {
    const client = new ftp();

    client.once('ready', () => {
      resolve({
        status: 'ready',
        client,
      });
    });

    client.connect(config);
  });
}

//获取文件列表
export function ftpList(client) {
  return new Promise((resolve, reject) => {
    client.list((err, files) => {
      resolve({ err: err, files: files });
    });
  });
}

//切换目录
export function ftpCwd(client, dirpath): Promise<any> {
  return new Promise((resolve, reject) => {
    client.cwd(dirpath, (err, dir) => {
      resolve({ err: err, dir: dir });
    });
  });
}

//将文件上传到ftp目标地址
async function putFile(client, currentFile, targetFilePath) {
  const dirpath = path.dirname(targetFilePath);
  const fileName = path.basename(targetFilePath);

  let readStream;
  if (typeof currentFile == 'string') {
    readStream = fs.createReadStream(currentFile);
  } else {
    readStream = currentFile.buffer;
  }

  const { err, dir } = await ftpCwd(client, dirpath);
  return new Promise(async (resolve, reject) => {
    if (err && err.code == 550) {
      client.mkdir(dirpath, (err) => {
        if (err) {
          reject(err);
        }
      });
      await ftpCwd(client, dirpath);
    }
    client.put(readStream, fileName, (err) => {
      client.once('end', () => {
        if (err) {
          reject({ success: false });
        } else {
          resolve({ success: true });
        }
        client.removeAllListeners();
        client.destroy();
      });

      client.end();
    });
  });
}

export async function ftpPutFile(currentFile, targetFilePath) {
  return new Promise((resolve, reject) => {
    ftpConnect().then((res) => {
      if (res.status == 'ready') {
        putFile(res.client, currentFile, targetFilePath)
          .then((res: any) => {
            if (res.success) {
              resolve(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
}

//下载文件
async function ftpGet(client, filePath): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePathFormate = transformPath(filePath);
    const dirpath = path.dirname(filePathFormate);
    const fileName = path.basename(filePath);
    ftpCwd(client, dirpath);
    client.get(fileName, (err, readerStream) => {
      if (err) {
        reject({ success: false });
      } else {
        resolve({ success: true, readerStream });
      }
    });
  });
}

export async function ftpGetFile(filePath, response): Promise<any> {
  return new Promise((resolve, reject) => {
    ftpConnect().then((connectRes) => {
      if (connectRes.status == 'ready') {
        const client = connectRes.client;
        ftpGet(client, filePath)
          .then((res) => {
            if (res.success) {
              const filename = path.basename(filePath);
              response.setHeader('Content-Type', dealContentType(filename));
              response.setHeader(
                'Content-Disposition',
                `attachment; filename=${encodeURIComponent(filename)}`,
              );

              const readStream = res.readerStream;
              let chunk = '';
              readStream.on('readable', function () {
                while (null != (chunk = readStream.read())) {
                  response.write(chunk);
                }
              });
              readStream.on('end', function () {
                client.once('end', () => {
                  response.end();
                  resolve({
                    succcess: true,
                  });
                  client.removeAllListeners();
                  client.destroy();
                });
                client.end();
              });
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
}

//为文件名增加时间戳
export function dealFileNameAddDate(file) {
  const name = file.originalname.split('.')[0];
  const fileName = `${
    name + '_' + new Date().getTime() + path.extname(file.originalname)
  }`;
  return fileName;
}

//处理返回的 contentType
export function dealContentType(filePath) {
  let contentType;
  const ext = path.extname(filePath);
  switch (ext) {
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;

    default:
      contentType = 'application/octet-stream';
      break;
  }

  return contentType;
}

//转换路径格式
const transformPath = (originPath) => {
  return path.normalize(originPath).replace(/\\/g, '/');
};
