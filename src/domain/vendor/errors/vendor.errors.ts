import { AppError } from '@/core/errors/app-error';

export class BuildVendorError extends AppError {
  readonly code = 'vendor-entity.build-vendor';

  constructor() {
    super('Tivemos um problema na estruturação dos dados');
  }
}
