import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesService } from './places.service.js';
import { PlacesController } from './places.controller.js';
import { Place, PlaceSchema } from './entities/place.entity.js';
import { RatingsModule } from '../ratings/ratings.module.js';

@Module({
  imports: [
    forwardRef(() => RatingsModule),
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }])
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService]
})
export class PlacesModule {}
