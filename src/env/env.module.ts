import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_VALIDATION_SCHEMA } from 'common/util/env.constants';

@Module({
  imports: [ConfigModule.forRoot({ validationSchema: ENV_VALIDATION_SCHEMA })],
})
export class EnvModule {}
