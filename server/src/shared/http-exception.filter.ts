import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message =
      exceptionResponse['message']
        .match(/\[\[.+?\]\]/g)
        ?.map((m: string) => m.replace('[[', '').replace(']]', '')) ||
      exception?.message;

    const result = {
      statusCode: status,
      date: new Date().toISOString(),
      message,
    };

    this.logger.error(result, request.url);

    response.status(status).json(result);
  }
}
