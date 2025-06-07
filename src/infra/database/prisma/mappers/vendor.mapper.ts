// vendor-mapper.ts
import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { Prisma } from '@prisma/client';

export class VendorMapper {
  static toDomain(
    raw: Prisma.VendorUncheckedCreateInput & { id: string },
  ): Vendor {
    return Vendor.restore(
      {
        name: raw.name,
        surname: raw.surname,
        birth: raw.birth,
        email: raw.email,
        phone: raw.phone,
        companyName: raw.companyName ?? undefined,
        document: raw.document,
        status: raw.status,
        plan: raw.plan,
        planExpiresAt: raw.planExpiresAt ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined,
      },
      new UniqueID(raw.id),
    );
  }

  static toPrisma(vendor: Vendor): Prisma.VendorCreateInput {
    return {
      name: vendor.name,
      surname: vendor.surname,
      birth: vendor.birth ?? undefined,
      email: vendor.email,
      phone: vendor.phone,
      companyName: vendor.companyName ?? undefined,
      document: vendor.document,
      status: vendor.status,
      plan: vendor.plan,
      planExpiresAt: vendor.planExpiresAt ?? undefined,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt ?? undefined,
    };
  }
}
