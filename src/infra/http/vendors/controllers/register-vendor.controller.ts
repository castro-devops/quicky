import { RegisterVendorUseCase } from '@/app/use-cases/vendor/register-vendor.use-case';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller({
  path: 'vendor',
  version: '1',
})
export class RegisterVendorController {
  constructor(private useCase: RegisterVendorUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register() {}
}
