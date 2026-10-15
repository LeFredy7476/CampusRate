import { Injectable, BadRequestException, InternalServerErrorException, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto.js';
import { UpdateRatingDto } from './dto/update-rating.dto.js';
import { Rating, RatingDocument } from './entities/rating.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { PlacesService } from '../places/places.service.js';
import type { IPlacesService } from '../places/places.service.js';


export interface IRatingsService {
  create: (createRatingDto: CreateRatingDto) => Promise<Rating | null>;
  findAll: () => Promise<Rating[] | null[]>;
  findOne: (id: string) => Promise<Rating | null>;
  findByPlace: (placeId: string) => Promise<Rating[] | null[]>;
  update: (id: string, updateRatingDto: UpdateRatingDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
  removeByPlace: (placeId: string) => Promise<void>;
}

@Injectable()
export class RatingsService implements IRatingsService {
  constructor (
    @Inject(forwardRef(() => PlacesService)) private readonly placesService: IPlacesService,
    @InjectModel(Rating.name) private readonly ratingModel: Model<RatingDocument>
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    const result = await this.placesService.findOne(createRatingDto.placeId);
    if (result) {
      const newRating = new this.ratingModel(createRatingDto)
      const returnValue = await newRating.save();
      await this.placesService.refresh(result.id);
      return returnValue;
    } else {
      throw new NotFoundException("Specified place does not exist");
    }
  }

  async findAll() {
    return await this.ratingModel.find().exec();
  }

  async findOne(id: string) {
    const returnVal = await this.ratingModel.findOne({ id: id }).exec();
    if (returnVal) {
      return returnVal;
    } else {
      throw new NotFoundException("Rating Not Found");
    }
  }

  async findByPlace(placeId: string) {
    return await this.ratingModel.find({placeId: placeId}).exec()
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const rating = await this.ratingModel.findOne({ id: id }).exec();
    const placeId = rating?.placeId
    await this.ratingModel.findOneAndUpdate({ id: id }, updateRatingDto).exec();
    if (placeId !== undefined) await this.placesService.refresh(placeId);
  }

  async remove(id: string) {
    const rating = await this.ratingModel.findOne({ id: id }).exec();
    const placeId = rating?.placeId;
    await rating?.deleteOne().exec();
    if (placeId !== undefined) await this.placesService.refresh(placeId);
  }

  async removeByPlace(placeId: string) {
    await this.ratingModel.deleteMany({placeId: placeId}).exec()
  }
}
