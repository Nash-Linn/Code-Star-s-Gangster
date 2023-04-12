import * as ftp from 'ftp';
import * as path from 'path';
import * as fs from 'fs';
import ftpConfig from 'src/config/ftpConfig';
import { HttpException, HttpStatus } from '@nestjs/common';

const client = new ftp();
const config = ftpConfig.config_pro;

client.on('close', () => {
  client.removeAllListeners();
});
client.on('end', () => {
  client.removeAllListeners();
});
client.on('error', (err) => {
  console.log('err', err);
});

export function ftpConnect(): Promise<any> {
  return new Promise((resolve, reject) => {
    client.on('ready', () => {
      resolve({
        status: 'ready',
        client,
      });
    });

    client.connect(config);
  });
}

export function ftpList() {
  return new Promise((resolve, reject) => {
    client.list((err, files) => {
      resolve({ err: err, files: files });
    });
  });
}

//切换目录
export function ftpCwd(dirpath): Promise<any> {
  return new Promise((resolve, reject) => {
    client.cwd(dirpath, (err, dir) => {
      resolve({ err: err, dir: dir });
    });
  });
}

//将本地文件上传到ftp目标地址
async function putLocalFile(currentFile, targetFilePath) {
  const dirpath = path.dirname(targetFilePath);
  const fileName = path.basename(targetFilePath);

  const rs = fs.createReadStream(currentFile);
  const { err, dir } = await ftpCwd(dirpath);
  if (err) {
    return Promise.resolve({ err });
  }

  return new Promise((resolve, reject) => {
    client.put(rs, fileName, (err) => {
      resolve({ err: err });
    });
  });
}

//将文件上传到ftp目标地址
async function putFileBuffer(currentFile, targetFilePath) {
  const dirpath = path.dirname(targetFilePath);
  const fileName = path.basename(targetFilePath);
  const { err, dir } = await ftpCwd(dirpath);
  return new Promise(async (resolve, reject) => {
    if (err && err.code == 550) {
      client.mkdir(dirpath, (err) => {
        if (err) {
          reject(err);
        }
      });
      await ftpCwd(dirpath);
    }
    client.put(currentFile.buffer, fileName, (err) => {
      if (err) {
        reject({ success: false });
      } else {
        resolve({ success: true });
      }
    });
  });
}

export async function ftpPutLocalFile(currentFile, targetFilePath) {
  ftpConnect().then((res) => {
    if (res.status == 'ready') {
      return new Promise((resolve, reject) => {
        putLocalFile(currentFile, targetFilePath).then((res) => {
          client.end();
          resolve(res);
        });
      });
    }
  });
}

export async function ftpPutFile(currentFile, targetFilePath) {
  return new Promise((resolve, reject) => {
    ftpConnect().then((res) => {
      if (res.status == 'ready') {
        putFileBuffer(currentFile, targetFilePath)
          .then((res: any) => {
            if (res.success) {
              resolve(res);
            }
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            client.end();
          });
      }
    });
  });
}

//下载文件
export async function ftpGet(filePath): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePathFormate = transformPath(filePath);
    const dirpath = path.dirname(filePathFormate);
    const fileName = path.basename(filePath);
    ftpCwd(dirpath);
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
        ftpGet(filePath)
          .then((res) => {
            if (res.success) {
              const readStream = res.readerStream;
              let chunk = '';
              readStream.on('readable', function () {
                while (null != (chunk = readStream.read())) {
                  response.write(chunk);
                }
              });
              readStream.on('end', function () {
                response.end();
                client.end();
                resolve({
                  succcess: true,
                });
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

export function dealFileNameAddDate(file) {
  const name = file.originalname.split('.')[0];
  const fileName = `${
    name + '_' + new Date().getTime() + path.extname(file.originalname)
  }`;
  return fileName;
}

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

const transformPath = (originPath) => {
  return path.normalize(originPath).replace(/\\/g, '/');
};
