import { RegisterVendorUseCase } from '@/app/use-cases/vendor/register-vendor.use-case';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import dayjs from '@/core/config/dayjs.config';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const bodySchemaRequest = z.object({
  name: z.string(),
  surname: z.string(),
  birth: z.date().default(dayjs().toDate()),
  email: z.string().email(),
  phone: z.string().max(11),
  companyName: z.string().optional(),
  document: z.string().optional(),
  plan: z.enum(['free', 'pro', 'enterprise']).default('free'),
  planExpiresAt: z.date().default(dayjs().add(7, 'day').toDate()),
});

type TBodySchemaRequest = z.infer<typeof bodySchemaRequest>;

@Controller({
  path: 'vendor',
})
export class RegisterVendorController {
  constructor(private useCase: RegisterVendorUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(bodySchemaRequest))
  async register(
    @Body()
    {
      name,
      surname,
      email,
      phone,
      plan,
      birth,
      document,
      companyName,
      planExpiresAt,
    }: TBodySchemaRequest,
  ) {
    const result = await this.useCase.execute({
      name,
      surname,
      email,
      phone,
      plan,
      birth,
      document,
      companyName,
      planExpiresAt,
    });

    console.log(result);
  }
}
