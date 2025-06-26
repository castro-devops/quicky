import { InMemoryVendorRepository } from 'test/repositories/memory/in-memory-vendor.repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RegisterVendorUseCase } from './register-vendor.use-case';
import { CanRegisterVendorPolicy } from './policies/can-register-vendor.policy';
import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { RegisterVendorError, VendorAlreadyExistsError } from '../errors';
import { BuildVendorError } from '@/domain/vendor/errors';

describe('RegisterVendorUseCase', () => {
  let repository: InMemoryVendorRepository;
  let useCase: RegisterVendorUseCase;

  beforeEach(() => {
    repository = new InMemoryVendorRepository();
    const policy = new CanRegisterVendorPolicy(repository);
    useCase = new RegisterVendorUseCase(repository, policy);
  });

  it('should be able register new vendor', async () => {
    const result = await useCase.execute({
      name: 'Jon',
      surname: 'Doe',
      birth: new Date('1999-01-01'),
      email: 'jondoe@example.com',
      phone: '5588988888888',
      document: '12345678910',
    });

    expect(result.right()).toBe(true);
    if (result.right()) {
      expect(result.value.vendor).toBeInstanceOf(Vendor);
      expect(result.value.vendor.email).toBe('jondoe@example.com');
      expect(repository.items).toHaveLength(1);
    }
  });

  it('should not be able allow registering with existing email', async () => {
    const vendor = Vendor.create({
      name: 'John',
      surname: 'Doe',
      birth: new Date('1990-01-01'),
      email: 'john@doe.com',
      phone: '5588988888888',
      document: '12345678910',
      status: 'pending',
    });

    await repository.save(vendor);

    const result = await useCase.execute({
      name: 'Jane',
      surname: 'Roe',
      birth: new Date('1992-02-02'),
      email: 'john@doe.com',
      phone: '5588988888888',
      document: '98765432100',
    });

    expect(result.left()).toBe(true);
    if (result.left()) {
      expect(result.value).toBeInstanceOf(VendorAlreadyExistsError);
    }
  });

  it('should return RegisterVendorError when repository returns null', async () => {
    class NullSaveVendorRepository extends InMemoryVendorRepository {
      override save(): Promise<Vendor | null> {
        return Promise.resolve(null);
      }
    }

    repository = new NullSaveVendorRepository();
    const policy = new CanRegisterVendorPolicy(repository);
    useCase = new RegisterVendorUseCase(repository, policy);

    const result = await useCase.execute({
      name: 'Jon',
      surname: 'Doe',
      birth: new Date('1999-01-01'),
      email: 'jondoe@example.com',
      phone: '5588988888888',
      document: '12345678910',
    });

    expect(result.left()).toBe(true);
    if (result.left()) {
      expect(result.value).toBeInstanceOf(RegisterVendorError);
    }
  });

  it('should propagate BuildVendorError when Vendor.create throws', async () => {
    const policy = new CanRegisterVendorPolicy(repository);
    useCase = new RegisterVendorUseCase(repository, policy);

    const buildError = new BuildVendorError({ message: 'invalid' });
    vi.spyOn(Vendor, 'create').mockImplementationOnce(() => {
      throw buildError;
    });

    const result = await useCase.execute({
      name: 'Jon',
      surname: 'Doe',
      birth: new Date('1999-01-01'),
      email: 'jondoe@example.com',
      phone: '5588988888888',
      document: '12345678910',
    });
    vi.restoreAllMocks();

    expect(result.left()).toBe(true);
    if (result.left()) {
      expect(result.value).toBe(buildError);
    }
  });
});
