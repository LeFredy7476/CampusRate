import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { PlaceCategory } from '../entities/place-category.enum.js';

export class QueryPlaceDto {

    @IsEnum(PlaceCategory)
    @IsOptional()
    category?: PlaceCategory;
    
    @Type(() => Number)
    @IsInt()
    @IsNumber()
    @Min(1)
    @IsOptional()
    page?: number;
    
    @Type(() => Number)
    @IsInt()
    @IsNumber()
    @Max(100)
    @Min(1)
    @IsOptional()
    limit?: number;
}