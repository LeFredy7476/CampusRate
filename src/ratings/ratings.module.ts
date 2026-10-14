import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingsService } from './ratings.service.js';
import { RatingsController } from './ratings.controller.js';
import { Rating, RatingSchema } from './entities/rating.entity.js';
import { PlacesModule } from '../places/places.module.js';

@Module({
  imports: [
    forwardRef(() => PlacesModule),
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService]
})
export class RatingsModule {}
