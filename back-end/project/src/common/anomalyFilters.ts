//异常过滤器
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class AnomalyFilters implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();

    const response = ctx.getResponse<Response>();

    const code = exception.getStatus();

    const res = exception.getResponse();

    response.status(code).json({
      success: false,
      time: new Date(),
      msg: res,
      code,
      path: request.url,
    });
  }
}
