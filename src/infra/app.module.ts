import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigsModule } from '@/core/config/configs.module';

@Module({
  imports: [DatabaseModule, ConfigsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
