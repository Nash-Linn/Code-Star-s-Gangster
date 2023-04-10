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

//将文件上传到ftp目标地址

async function put(currentFile, targetFilePath) {
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

//下载文件
async function get(filePath) {
  const dirpath = path.dirname(filePath);
  const fileName = path.basename(filePath);
  await ftpCwd(dirpath);
  return new Promise((resolve, reject) => {
    client.get(fileName, (err, rs) => {
      const ws = fs.createWriteStream(fileName);
      rs.pipe(ws);
      resolve({ err: err });
    });
  });
}

export async function ftpPut(currentFile, targetFilePath) {
  ftpConnect().then((res) => {
    if (res == 'ready') {
      return new Promise((resolve, reject) => {
        put(currentFile, targetFilePath).then((res) => {
          client.end();
          resolve(res);
        });
      });
    }
  });
}
