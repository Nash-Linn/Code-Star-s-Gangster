import env from './env';
import { ftpKey } from '../config/keys'; //用于存储ftp密码
const config_pro = {
  host: env.ip,
  port: '21',
  user: 'csgRoot',
  password: ftpKey.csgRoot,
  keepalive: 10000,
};

export default {
  config_pro,
};
