//响应拦截器
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Data<T> {
  data: T;
}

export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Data<T>> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: '成功',
          success: true,
        };
      }),
    );
  }
}
