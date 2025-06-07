import { VendorRepository } from '@/app/repositories/vendor.repository';
import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { VendorMapper } from '../mappers/vendor.mapper';

@Injectable()
export class PrismaVendorRepository implements VendorRepository {
  constructor(private readonly db: PrismaService) {}

  async save(vendor: Vendor) {
    const created = await this.db.vendor.create({
      data: {
        id: vendor.id.toValue(),
        ...VendorMapper.toPrisma(vendor),
      },
    });

    return VendorMapper.toDomain(created);
  }

  async findByEmail(email: string) {
    const vendor = await this.db.vendor.findUnique({
      where: {
        email,
      },
    });

    if (!vendor) {
      return null;
    }

    return VendorMapper.toDomain(vendor);
  }
}
