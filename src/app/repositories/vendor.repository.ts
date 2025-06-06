import { Vendor } from '@/domain/vendor/entities/vendor.entity';

export abstract class VendorRepository {
  abstract save(vendor: Vendor): Promise<Vendor | null>;
  abstract findByEmail(email: string): Promise<Vendor | null>;
}
