import { Global, Module } from '@nestjs/common';
import dayjs from '@/core/config/dayjs.config';

@Global()
@Module({
  providers: [
    {
      provide: 'DAYJS',
      useValue: dayjs,
    },
  ],
  exports: ['DAYJS'],
})
export class ConfigsModule {}
