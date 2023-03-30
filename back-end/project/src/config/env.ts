import { join } from 'path';

interface Env {
  baseUrl: string;
  staticDir: string;
}

function envFunc(evn): Env {
  let baseUrl: string;
  let staticDir: string;
  switch (evn) {
    case 'dev':
      baseUrl = 'http://localhost:8080/';
      staticDir = join(__dirname, '..', 'static');
      break;
    case 'pro':
      baseUrl = 'http://101.34.111.220:8080/';
      staticDir = '/code_star_gangster/static';
      break;
    default:
      baseUrl = 'http://localhost:8080/';
      staticDir = join(__dirname, '..', 'static');
      break;
  }

  return {
    baseUrl,
    staticDir,
  };
}

type envType = 'pro' | 'dev';

const env: envType = 'dev';

const Env = envFunc(env);
export default {
  env: env,
  baseURL: Env.baseUrl,
  staticDir: Env.staticDir,
};
