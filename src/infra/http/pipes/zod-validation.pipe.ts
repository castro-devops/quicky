import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema<T>) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Falha de validação',
          statusCode: 400,
          errors: fromZodError(error),
        });
      }

      throw new BadRequestException({
        message: 'Falha de validação',
        statusCode: 400,
      });
    }
  }
}
