import { VendorRepository } from '@/app/repositories/vendor.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CanRegisterVendorPolicy {
  constructor(private readonly vendorRepository: VendorRepository) {}

  async execute(email: string): Promise<boolean> {
    const vendor = await this.vendorRepository.findByEmail(email);
    return !vendor;
  }
}
