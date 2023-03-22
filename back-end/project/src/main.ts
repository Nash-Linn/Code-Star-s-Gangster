import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/responseInterceptor'; //引入响应拦截器
import { AnomalyFilters } from './common/anomalyFilters'; //引入异常过滤器
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  app.useGlobalInterceptors(new ResponseInterceptor()); //想要拦截器
  app.useGlobalFilters(new AnomalyFilters());

  await app.listen(8080);
}
bootstrap();
