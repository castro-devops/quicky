import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigsModule } from '@/core/configs/configs.module';
import { ApplicationModule } from '@/app/application.module';
import { CoreModule } from '@/core/core.module';
import { VendorsModule } from './http/vendors/vendors.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigsModule,
    ApplicationModule,
    CoreModule,
    VendorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
