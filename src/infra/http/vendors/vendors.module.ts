import { Module } from '@nestjs/common';
import { RegisterVendorController } from './controllers/register-vendor.controller';
import { RegisterVendorUseCase } from '@/app/use-cases/vendor/register-vendor.use-case';
import { VendorRepository } from '@/app/repositories/vendor.repository';
import { PrismaVendorRepository } from '@/infra/database/prisma/repositories/vendor.repository';
import { CanRegisterVendorPolicy } from '@/app/use-cases/vendor/policies/can-register-vendor.policy';

@Module({
  controllers: [RegisterVendorController],
  providers: [
    RegisterVendorUseCase,
    {
      provide: VendorRepository,
      useClass: PrismaVendorRepository,
    },
    CanRegisterVendorPolicy,
  ],
})
export class VendorsModule {}
