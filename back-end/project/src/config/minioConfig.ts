import env from './env';
import { minioKey } from '../config/keys'; //用于存储minio密码
const minioOptions = {
  endPoint: env.ip,
  port: 9000,
  accessKey: 'CSGansterAccessKey',
  secretKey: minioKey.CSGansterAccessKey,
  useSSL: false,
};

export default {
  minioOptions,
};
