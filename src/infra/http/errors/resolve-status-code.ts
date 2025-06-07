import { AppError } from '@/core/errors/app.error';

export function resolveStatusCode(error: AppError): number {
  switch (error.code) {
    case 'vendor-service.already-exists':
      return 409;
    case 'vendor-service.register-error':
      return 400;
    default:
      return 400;
  }
}
