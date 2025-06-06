import { Controller, Post } from '@nestjs/common';

@Controller('vendor')
export class RegisterVendorController {
  @Post('register')
  register() {}
}
