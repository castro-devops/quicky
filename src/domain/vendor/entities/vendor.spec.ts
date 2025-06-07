import { describe, it, expect } from 'vitest';
import { Vendor } from './vendor.entity';
import { BuildVendorError } from '../errors';
import { UniqueID } from '@/core/value-objects/unique-id.vo';

describe('Vendor Entity', () => {
  it('should populate createdAt if not provided', () => {
    const vendor = Vendor.create({
      name: 'Jon',
      surname: 'Doe',
      birth: new Date('1990-01-01'),
      email: 'jon.doe@example.com',
      phone: '5588988888888',
      document: '12345678910',
      status: 'pending',
      plan: 'free',
      planExpiresAt: new Date(),
    });

    const createdAt = vendor.createdAt;

    expect(createdAt).toBeInstanceOf(Date);
  });

  it('should throw BuildVendorError when required field is missing', () => {
    expect(() =>
      Vendor.create({
        name: '',
        surname: 'Doe',
        birth: new Date('1990-01-01'),
        email: 'jon.doe@example.com',
        phone: '5588988888888',
        document: '12345678910',
        status: 'pending',
        plan: 'free',
        planExpiresAt: new Date(),
        createdAt: new Date(),
      }),
    ).toThrow(BuildVendorError);
  });

  it('should keep provided id when restored', () => {
    const id = new UniqueID('custom-id');

    const vendor = Vendor.restore(
      {
        name: 'Jon',
        surname: 'Doe',
        birth: new Date('1990-01-01'),
        email: 'jon.doe@example.com',
        phone: '5588988888888',
        document: '12345678910',
        status: 'pending',
        plan: 'free',
        planExpiresAt: new Date('2025-01-01'),
        createdAt: new Date('2024-01-01'),
      },
      id,
    );

    expect(vendor.id.toValue()).toBe('custom-id');
  });
});
