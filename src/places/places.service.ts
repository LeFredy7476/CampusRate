import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';
import { Place, PlaceDocument, PlaceSchema } from './entities/place.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    const newPlace = new this.placeModel(createPlaceDto);
    return newPlace.save();
  }

  async findAll() {
    return this.placeModel.find().exec();
  }

  async findOne(id: string) {
    return this.placeModel.findOne({ id: id }).exec();
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    return this.placeModel.findOneAndUpdate({ id: id }, updatePlaceDto).exec();
  }

  async remove(id: string) {
    return this.placeModel.findOneAndDelete({ id: id }).exec();
  }
}
