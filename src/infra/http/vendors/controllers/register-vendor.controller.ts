import { RegisterVendorUseCase } from '@/app/use-cases/vendor/register-vendor.use-case';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import dayjs from '@/core/configs/dayjs.config';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { ErroMapper } from '@/infra/http/errors/mapper.error';
import { VendorPresenter } from '../presenters/vendor.presenter';

const bodySchemaRequest = z.object({
  name: z.string(),
  surname: z.string(),
  birth: z.date().default(dayjs().toDate()),
  email: z.string().email(),
  phone: z.string().max(11),
  document: z.string().optional(),
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
    { name, surname, email, phone, birth, document }: TBodySchemaRequest,
  ) {
    const result = await this.useCase.execute({
      name,
      surname,
      email,
      phone,
      birth,
      document,
    });

    if (result.left()) {
      throw ErroMapper.toHttp(result.value);
    }

    return VendorPresenter.toHTTP(result.value.vendor);
  }
}
