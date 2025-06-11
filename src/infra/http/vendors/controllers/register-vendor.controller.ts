import { RegisterVendorUseCase } from '@/app/use-cases/vendor/register-vendor.use-case';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterVendorDto } from '../schemas/register-vendor.dto';
import dayjs from '@/core/config/dayjs.config';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const bodySchemaRequest = z.object({
  name: z.string(),
  surname: z.string(),
  birth: z.date().optional(),
  email: z.string().email(),
  phone: z.string().max(11),
  companyName: z.string().optional(),
  document: z.string().optional(),
  plan: z.enum(['free', 'pro', 'enterprise']).default('free'),
  planExpiresAt: z.date().default(dayjs().add(7, 'day').toDate()),
});

type TBodySchemaRequest = z.infer<typeof bodySchemaRequest>;

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
  @UsePipes(new ZodValidationPipe(bodySchemaRequest))
  register(@Body() body: TBodySchemaRequest) {
    console.log(body);
  }
}
