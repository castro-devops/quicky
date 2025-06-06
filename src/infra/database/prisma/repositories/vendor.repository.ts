import { VendorRepository } from '@/app/repositories/vendor.repository';
import { Vendor } from '@/domain/vendor/entities/vendor.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UniqueID } from '@/core/value-objects/unique-id.vo';

@Injectable()
export class PrismaVendorRepository implements VendorRepository {
  constructor(private readonly db: PrismaService) {}

  async save(vendor: Vendor) {
    const { id, name, surname, birth, email, phone } =
      await this.db.vendor.create({
        data: {
          name: vendor.name,
          surname: vendor.surname,
          birth: vendor.birth,
          email: vendor.email,
          phone: vendor.phone,
        },
      });

    return Vendor.restore(
      { name, surname, birth, email, phone },
      new UniqueID(id),
    );
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

    const { id, name, surname, birth, phone } = vendor;

    return Vendor.restore(
      { name, surname, birth, email, phone },
      new UniqueID(id),
    );
  }
}
