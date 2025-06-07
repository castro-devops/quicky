import { InMemoryVendorRepository } from 'test/repositories/memory/in-memory-vendor.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CanRegisterVendorPolicy } from './can-register-vendor.policy';
import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import dayjs from '@/core/config/dayjs.config';

describe('CanRegisterVendorPolicy', () => {
  let repository: InMemoryVendorRepository;
  let policy: CanRegisterVendorPolicy;

  beforeEach(() => {
    repository = new InMemoryVendorRepository();
    policy = new CanRegisterVendorPolicy(repository);
  });

  it('should return true when vendor does not exist', async () => {
    const result = await policy.execute('new@example.com');
    expect(result).toBe(true);
  });

  it('should return false when vendor already exists', async () => {
    const vendor = Vendor.create({
      name: 'John',
      surname: 'Doe',
      birth: dayjs('1990-01-01').toDate(),
      email: 'john@doe.com',
      phone: '5588999999999',
      document: '12345678910',
      status: 'pending',
      plan: 'free',
      planExpiresAt: dayjs().add(30, 'days').toDate(),
      createdAt: dayjs().toDate(),
    });

    await repository.save(vendor);

    const result = await policy.execute('john@doe.com');
    expect(result).toBe(false);
  });
});
