import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';

@Module({
  imports: [
    {
      module: ConfigsModule,
      global: true,
    },
  ],
})
export class CoreModule {}
