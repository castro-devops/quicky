import { RegisterVendorUseCase } from '@/app/use-cases/vendor/register-vendor.use-case';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterVendorDto } from '../schemas/register-vendor.dto';

@Controller({
  path: 'api/v1/vendor',
})
@ApiTags('Vendor')
export class RegisterVendorController {
  constructor(private useCase: RegisterVendorUseCase) {}

  @Post('register')
  @ApiOperation({ summary: 'Cria uma nova conta' })
  @ApiBody({ type: RegisterVendorDto })
  @HttpCode(HttpStatus.CREATED)
  register() {}
}
