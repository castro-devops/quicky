import { AppError } from '@/core/errors/app-error';

export class VendorAlreadyExistsError extends AppError {
  readonly code = 'vendor-service.already-exists';

  constructor() {
    super('Já existe uma conta com este email.');
  }
}

export class RegisterVendorError extends AppError {
  readonly code = 'vendor-service.register-error';

  constructor() {
    super('Tivemos um erro ao tentar criar esta conta.');
  }
}
