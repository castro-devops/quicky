import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaVendorRepository } from './repositories/vendor.repository';
import { VendorRepository } from '@/app/repositories/vendor.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: VendorRepository,
      useClass: PrismaVendorRepository,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: VendorRepository,
      useClass: PrismaVendorRepository,
    },
  ],
})
export class PrismaModule {}
