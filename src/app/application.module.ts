import { Module } from '@nestjs/common';
import { VendorModule } from './use-cases/vendor/vendor.module';
import { CanRegisterVendorPolicy } from './use-cases/vendor/policies/can-register-vendor.policy';
import { VendorRepository } from './repositories/vendor.repository';
import { PrismaVendorRepository } from '@/infra/database/prisma/repositories/vendor.repository';

@Module({
  imports: [VendorModule],
  providers: [
    CanRegisterVendorPolicy,
    {
      provide: VendorRepository,
      useClass: PrismaVendorRepository,
    },
  ],
  exports: [VendorModule],
})
export class ApplicationModule {}
