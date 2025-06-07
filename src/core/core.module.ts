import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/configs.module';

@Module({
  imports: [
    {
      module: ConfigsModule,
      global: true,
    },
  ],
})
export class CoreModule {}
