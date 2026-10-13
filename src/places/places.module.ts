import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesService } from './places.service.js';
import { PlacesController } from './places.controller.js';
import { Place, PlaceSchema } from './entities/place.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }])
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
