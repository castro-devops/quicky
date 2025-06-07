import { describe, it, expect } from 'vitest';
import { ErroMapper } from '@/infra/http/errors/mapper.error';
import {
  VendorAlreadyExistsError,
  RegisterVendorError,
} from '@/app/use-cases/errors/vendor.errors';
import { BuildVendorError } from '@/domain/vendor/errors';

describe('ErroMapper.toHttp', () => {
  it('should map VendorAlreadyExistsError to HttpException with status 409', () => {
    const error = new VendorAlreadyExistsError();

    const httpException = ErroMapper.toHttp(error);
    const response = httpException.getResponse();

    expect(httpException.getStatus()).toBe(409);
    expect(response).toEqual(
      expect.objectContaining({
        statusCode: 409,
        code: 'vendor-service.already-exists',
      }),
    );
  });

  it('should map RegisterVendorError to HttpException with status 400', () => {
    const error = new RegisterVendorError();

    const httpException = ErroMapper.toHttp(error);
    const response = httpException.getResponse();

    expect(httpException.getStatus()).toBe(400);
    expect(response).toEqual(
      expect.objectContaining({
        statusCode: 400,
        code: 'vendor-service.register-error',
      }),
    );
  });

  it('should map BuildVendorError to HttpException with default status 400', () => {
    const error = new BuildVendorError({});

    const httpException = ErroMapper.toHttp(error);
    const response = httpException.getResponse();

    expect(httpException.getStatus()).toBe(400);
    expect(response).toEqual(
      expect.objectContaining({
        statusCode: 400,
        code: 'vendor-entity.build-vendor',
      }),
    );
  });
});
