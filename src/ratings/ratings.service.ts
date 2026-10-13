import { Injectable, BadRequestException, InternalServerErrorException, Inject, forwardRef } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto.js';
import { UpdateRatingDto } from './dto/update-rating.dto.js';
import { Rating, RatingDocument } from './entities/rating.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlacesService } from '../places/places.service.js';

@Injectable()
export class RatingsService {
  constructor (
    @Inject(forwardRef(() => PlacesService)) private placesService: PlacesService,
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>
  ){}

  async create(createRatingDto: CreateRatingDto) {
    const result = await this.placesService.findOne(createRatingDto.placeId);
    if (result) {
      const newRating = new this.ratingModel(createRatingDto)
      return newRating.save();
    } else {
      throw new BadRequestException("specified place does not exist")
    }
  }

  async findAll() {
    return this.ratingModel.find().exec();
  }

  async findOne(id: string) {
    return this.ratingModel.findOne({ id: id }).exec();
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    return this.ratingModel.findOneAndUpdate({ id: id }, updateRatingDto).exec();
  }

  async remove(id: string) {
    return this.ratingModel.findOneAndDelete({ id: id }).exec();
  }
}
