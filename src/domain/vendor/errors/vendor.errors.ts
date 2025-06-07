import { AppError } from '@/core/errors/app.error';

export class BuildVendorError extends AppError {
  readonly code = 'vendor-entity.build-vendor';

  constructor({ message }: { message?: string }) {
    super(message ?? 'Tivemos um problema na estruturação dos dados');
  }
}
