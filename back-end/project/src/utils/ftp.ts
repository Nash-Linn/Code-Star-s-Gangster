import * as ftp from 'ftp';
import * as path from 'path';
import * as fs from 'fs';
import ftpConfig from 'src/config/ftpConfig';

const client = new ftp();
const config = ftpConfig.config_pro;

export function ftpConnect(): Promise<any> {
  return new Promise((resolve, reject) => {
    client.on('ready', () => {
      resolve({
        status: 'ready',
        client,
      });
    });
    client.on('close', () => {
      resolve({
        status: 'close',
        client,
      });
    });
    client.on('end', () => {
      resolve({
        status: 'end',
        client,
      });
    });
    client.on('error', (err) => {
      reject(err);
    });

    client.connect(config);
  });
}

// let status: any;

// client.on('ready', () => {
//   status = 'ready';
// });
// client.on('close', () => {
//   status = 'close';
// });
// client.on('end', () => {
//   status = 'end';
// });
// client.on('error', (err) => {
//   status = 'error';
//   console.log('err=============', err);
//   throw err;
// });

// export function ftpConnect(): Promise<any> {
//   return new Promise(async (resolve, reject) => {
//     await client.connect(config);
//     resolve({
//       status,
//       client,
//     });
//   });
// }

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
  if (err) {
    return Promise.resolve({ err });
  }
  return new Promise((resolve, reject) => {
    client.put(currentFile.buffer, fileName, (err) => {
      resolve({ err: err });
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
  ftpConnect().then((res) => {
    if (res.status == 'ready') {
      return new Promise((resolve, reject) => {
        putFileBuffer(currentFile, targetFilePath).then((res) => {
          client.end();
          resolve(res);
        });
      });
    }
  });
}

//下载文件
export async function ftpGet(filePath): Promise<any> {
  const filePathFormate = path.normalize(filePath).replace(/\\/g, '/');
  const dirpath = path.dirname(filePathFormate);

  const fileName = path.basename(filePath);
  await ftpCwd(dirpath);

  return new Promise((resolve, reject) => {
    client.get(fileName, (err, rs) => {
      resolve({ err, rs });
    });
  });
}

export async function ftpGetFile(filePath, response): Promise<any> {
  return new Promise((resolve, reject) => {
    ftpConnect().then((connectRes) => {
      if (connectRes.status == 'ready') {
        ftpGet(filePath).then((res) => {
          if (res.err) {
            reject(res.err);
          } else if (res.rs) {
            const readStream = res.rs;
            let chunk = '';
            readStream.on('readable', function () {
              while (null != (chunk = readStream.read())) {
                response.write(chunk);
              }
            });
            readStream.on('close', function () {
              response.end();
              client.end();
            });

            resolve({
              readStream,
              client: connectRes.client,
            });
          }
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
