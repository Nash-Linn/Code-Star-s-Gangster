import * as ftp from 'ftp';
import * as path from 'path';
import * as fs from 'fs';
import ftpConfig from 'src/config/ftpConfig';

const client = new ftp();
const config = ftpConfig.config_pro;

export function ftpConnect() {
  return new Promise((resolve, reject) => {
    client.on('ready', () => {
      resolve('ready');
    });
    client.on('close', () => {
      resolve('close');
    });
    client.on('end', () => {
      resolve('end');
    });
    client.on('error', (err) => {
      reject(err);
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
    if (res == 'ready') {
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
    if (res == 'ready') {
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
      // const ws = fs.createWriteStream(fileName);
      // rs.pipe(ws);
      resolve({ err, rs });
    });
  });
}

export async function ftpGetFile(filePath) {
  return new Promise((resolve, reject) => {
    ftpConnect().then((res) => {
      if (res == 'ready') {
        ftpGet(filePath).then((res) => {
          if (res.err) {
            reject(res.err);
          } else if (res.rs) {
            resolve(res.rs);
          }
          client.end();
        });
      }
    });
  });
}

export function dealFileNameAddDate(file) {
  const name = file.originalname.split('.')[0];
  const fileName = `${
    name + '(' + new Date().getTime() + ')' + path.extname(file.originalname)
  }`;
  return fileName;
}
