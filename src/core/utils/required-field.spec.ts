import { describe, it, expect } from 'vitest';
import { requiredFields } from '@/core/utils/required-field.util';
import { BuildVendorError } from '@/domain/vendor/errors';

describe('requiredFields utility', () => {
  it('should throw BuildVendorError when a required field is missing', () => {
    const call = () =>
      requiredFields<{ name: string }>(
        { name: 'Nome obrigatório' },
        {},
        { general: BuildVendorError },
      );

    expect(call).toThrowError(BuildVendorError);
  });

  it('should not throw when all required fields are present', () => {
    const call = () =>
      requiredFields<{ name: string }>(
        { name: 'Nome obrigatório' },
        { name: 'John Doe' },
        { general: BuildVendorError },
      );

    expect(call).not.toThrow();
  });
});
