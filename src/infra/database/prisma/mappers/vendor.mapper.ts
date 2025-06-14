import { safeAssign } from '@/core/utils/safe-assing.util';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { Prisma, Vendor as PrismaVendor } from '@prisma/client';

export class VendorMapper {
  static toDomain(raw: PrismaVendor): Vendor {
    return Vendor.restore(
      {
        name: raw.name,
        surname: raw.surname,
        birth: raw.birth ?? null,
        email: raw.email,
        phone: raw.phone,
        companyName: safeAssign(raw.companyName),
        document: safeAssign(raw.document),
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
      companyName: vendor.companyName,
      document: vendor.document,
      status: vendor.status,
      plan: vendor.plan,
      planExpiresAt: vendor.planExpiresAt ?? undefined,
      updatedAt: vendor.updatedAt ?? undefined,
    };
  }
}
