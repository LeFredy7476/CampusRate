import { Module } from '@nestjs/common';
import { RatingsModule } from './ratings/ratings.module.js';
import { PlacesModule } from './places/places.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './config/database.config.js'
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      validationSchema: Joi.object({
        MONGO_PORT: Joi.string().required(),
        MONGO_DOMAIN: Joi.string().required(),
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        PORT: Joi.number().default(3000),
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        autoIndex: process.env.NODE_ENV !== 'production',
      }),
    }),
    RatingsModule, 
    PlacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
