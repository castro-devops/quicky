import { BadRequestException } from '@nestjs/common';
import { describe, it, expect } from 'vitest';
import { z } from 'zod';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';

describe('ZodValidationPipe', () => {
  const schema = z.object({
    name: z.string(),
  });

  it('should parse valid values without throwing', () => {
    const pipe = new ZodValidationPipe(schema);

    expect(pipe.transform({ name: 'John' })).toEqual({ name: 'John' });
  });

  it('should throw BadRequestException with errors for invalid values', () => {
    const pipe = new ZodValidationPipe(schema);

    let error: unknown;
    try {
      pipe.transform({ name: 123 } as any);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(BadRequestException);
    if (error instanceof BadRequestException) {
      const response = error.getResponse();
      expect(response).toHaveProperty('errors');
    }
  });
});
