import { join } from 'path';

interface Env {
  baseUrl: string;
  staticDir: string;
  ip: string;
}

function envFunc(evn): Env {
  let baseUrl: string;
  let ip: string;
  let staticDir: string;
  switch (evn) {
    case 'dev':
      baseUrl = 'http://localhost:8080';
      staticDir = join(__dirname, '..', 'static');
      break;
    case 'pro':
      // ip = '101.34.111.220';
      ip = '123.249.17.37';
      baseUrl = `http://${ip}:8080`;
      staticDir = '/code_star_gangster/static';
      break;
    default:
      baseUrl = 'http://localhost:8080';
      staticDir = join(__dirname, '..', 'static');
      break;
  }

  return {
    baseUrl,
    staticDir,
    ip,
  };
}

type envType = 'pro' | 'dev';

const env: envType = 'pro';

const Env = envFunc(env);
export default {
  envType: env,
  baseURL: Env.baseUrl,
  staticDir: Env.staticDir,
  ip: Env.ip,
};
