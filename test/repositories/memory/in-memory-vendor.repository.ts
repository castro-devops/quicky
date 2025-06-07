import { VendorRepository } from '@/app/repositories/vendor.repository';
import { Vendor } from '@/domain/vendor/entities/vendor.entity';

export class InMemoryVendorRepository implements VendorRepository {
  public items: Vendor[] = [];

  save(vendor: Vendor): Promise<Vendor | null> {
    this.items.push(vendor);
    return Promise.resolve(vendor ?? null);
  }
  findByEmail(email: string): Promise<Vendor | null> {
    const vendor = this.items.find((v) => v.email === email);
    return Promise.resolve(vendor ?? null);
  }
}
