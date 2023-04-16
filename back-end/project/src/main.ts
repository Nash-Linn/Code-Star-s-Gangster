import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { ResponseInterceptor } from './common/responseInterceptor'; //引入响应拦截器
import { AnomalyFilters } from './common/anomalyFilters'; //引入异常过滤器
import * as cors from 'cors';
import env from './config/env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors());

  app.useGlobalInterceptors(new ResponseInterceptor()); //想要拦截器
  app.useGlobalFilters(new AnomalyFilters());
  app.useStaticAssets(env.staticDir, {
    prefix: '/static/',
  }); //访问静态资源

  await app.listen(8080);
}
bootstrap();
