import { Module } from '@nestjs/common';
import { PlatesModule } from './plates/plates.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitsController } from './visits/visits.controller';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().default(5000),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PlatesModule,
    VisitsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
