import { Module } from '@nestjs/common';
import { RegisterVendorUseCase } from './register-vendor.use-case';
import { VendorRepository } from '@/app/repositories/vendor.repository';
import { CanRegisterVendorPolicy } from './policies/can-register-vendor.policy';
import { PrismaVendorRepository } from '@/infra/database/prisma/repositories/vendor.repository';

@Module({
  providers: [
    RegisterVendorUseCase,
    {
      provide: VendorRepository,
      useClass: PrismaVendorRepository,
    },
    {
      provide: CanRegisterVendorPolicy,
      useFactory: (repo: VendorRepository) => new CanRegisterVendorPolicy(repo),
      inject: [VendorRepository],
    },
  ],
  exports: [RegisterVendorUseCase],
})
export class VendorModule {}
