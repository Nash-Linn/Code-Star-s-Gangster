import * as Minio from 'minio';
import * as path from 'path';
import * as fs from 'fs';
import minioConfig from 'src/config/minioConfig';

export function putFileToMinio(currentFile, bucketName, targetFilePath) {
  return new Promise((resolve, reject) => {
    targetFilePath = transformPath(targetFilePath);
    const s3Client = new Minio.Client(minioConfig.minioOptions);

    let readStream;
    if (typeof currentFile == 'string') {
      readStream = fs.createReadStream(currentFile);
    } else {
      readStream = currentFile.buffer;
    }

    s3Client.putObject(
      bucketName,
      targetFilePath,
      readStream,
      function (e, objInfo) {
        if (e) {
          const error = {
            success: false,
            e,
          };
          return reject(error);
        }

        const res = {
          success: true,
          objInfo,
        };
        resolve(res);
      },
    );
  });
}

export function getFileFromMinio(response, bucketName, filePath) {
  filePath = transformPath(filePath);
  const s3Client = new Minio.Client(minioConfig.minioOptions);
  s3Client.getObject(bucketName, filePath, function (e, dataStream) {
    if (e) {
      return console.log(e);
    }
    const filename = path.basename(filePath);
    response.setHeader('Content-Type', dealContentType(filename));
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(filename)}`,
    );

    dataStream.on('data', function (chunk) {
      response.write(chunk);
    });
    dataStream.on('end', function () {
      response.end();
    });
    dataStream.on('error', function (e) {
      console.log(e);
    });
  });
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
