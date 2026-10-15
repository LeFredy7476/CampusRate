import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingDto } from './create-rating.dto.js';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {}
