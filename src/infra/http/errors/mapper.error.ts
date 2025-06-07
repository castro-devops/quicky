import { AppError } from '@/core/errors/app.error';
import { HttpException } from '@nestjs/common';
import { resolveStatusCode } from './resolve-status-code';

interface HttpErrorResponse {
  statusCode: number;
  message: string;
  code: string;
}

export class ErroMapper {
  static toHttp(error: unknown): HttpException {
    if (error instanceof AppError) {
      const httpResponse = this.toResponseHttp(error);
      return new HttpException(httpResponse, httpResponse.statusCode);
    }

    return new HttpException(
      {
        statusCode: 500,
        message: 'Tivemos um problema desconhecido',
        code: 'internal.server-error',
      },
      500,
    );
  }

  private static toResponseHttp(error: AppError): HttpErrorResponse {
    return {
      statusCode: resolveStatusCode(error),
      message: error.message,
      code: error.code,
    };
  }
}
