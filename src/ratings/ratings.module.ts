import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingsService } from './ratings.service.js';
import { RatingsController } from './ratings.controller.js';
import { Rating, RatingSchema } from './entities/rating.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
