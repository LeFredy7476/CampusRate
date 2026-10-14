import { Injectable, BadRequestException, InternalServerErrorException, Inject, forwardRef } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';
import { Place, PlaceDocument } from './entities/place.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { IRatingsService } from '../ratings/ratings.service.js';
import { RatingsService } from '../ratings/ratings.service.js';


export interface IPlacesService {
  create: (createPlaceDto: CreatePlaceDto) => Promise<Place | null>;
  findAll: () => Promise<Place[] | null[]>;
  findOne: (id: string) => Promise<Place | null>;
  update: (id: string, updatePlaceDto: UpdatePlaceDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: (id: string) => Promise<void>;
}

@Injectable()
export class PlacesService implements IPlacesService {
  constructor(
    @Inject(forwardRef(() => RatingsService)) private ratingsService: IRatingsService,
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
    await this.placeModel.findOneAndUpdate({ id: id }, updatePlaceDto).exec();
  }

  async remove(id: string) {
    await this.placeModel.findOneAndDelete({ id: id }).exec();
    await this.ratingsService.removeByPlace(id);
  }

  async refresh(id: string) {
    console.log("refreshing : " + id);
    const reviews = await this.ratingsService.findByPlace(id);
    const count = reviews.length;
    let average: number | null = 0;
    for (let review of reviews) {
      if (review) average += review?.rating;
    }
    if (count > 0) {average = average / count;}
    else {average = null;}
    console.log(`{averageRating: ${average}, reviewCount: ${count}}`);
    await this.placeModel.findOneAndUpdate({id: id}, {averageRating: average, reviewCount: count}).exec();
  }
}
