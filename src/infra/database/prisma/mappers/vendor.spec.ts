import { describe, it, expect, vi } from 'vitest';
import { VendorMapper } from '@/infra/database/prisma/mappers/vendor.mapper';
import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import dayjs from '@/core/configs/dayjs.config';

vi.mock('@prisma/client', () => ({ Prisma: {} }));

describe('VendorMapper', () => {
  it('should convert PrismaVendor to domain with safeAssign', () => {
    const raw = {
      id: 'vendor-1',
      name: 'John',
      surname: 'Doe',
      birth: new Date('1990-01-01'),
      email: 'john@doe.com',
      phone: '5588999999999',
      companyName: null,
      document: '123456789',
      status: 'active' as const,
      plan: 'free' as const,
      planExpiresAt: new Date('2024-01-01'),
      createdAt: new Date('2023-01-01'),
      updatedAt: null,
      deletedAt: null,
    };

    const domain = VendorMapper.toDomain(raw);

    expect(domain).toBeInstanceOf(Vendor);
    expect(domain.companyName).toBeUndefined();
    expect(domain.id.toValue()).toBe('vendor-1');
  });

  it('should convert Vendor entity to Prisma input', () => {
    const vendor = Vendor.restore(
      {
        name: 'Jane',
        surname: 'Roe',
        birth: new Date('1992-02-02'),
        email: 'jane@roe.com',
        phone: '5588777777777',
        companyName: 'ACME',
        document: '987654321',
        status: 'pending',
        plan: 'pro',
        planExpiresAt: dayjs('2025-05-05').toDate(),
        createdAt: dayjs('2024-01-01').toDate(),
        updatedAt: undefined,
      },
      new UniqueID('vendor-2'),
    );

    const prisma = VendorMapper.toPrisma(vendor);

    expect(prisma).toEqual({
      name: vendor.name,
      surname: vendor.surname,
      birth: vendor.birth ?? undefined,
      email: vendor.email,
      phone: vendor.phone,
      companyName: vendor.companyName,
      document: vendor.document,
      status: vendor.status,
      plan: vendor.plan,
      planExpiresAt: vendor.planExpiresAt ?? undefined,
      updatedAt: vendor.updatedAt ?? undefined,
    });
  });
});
