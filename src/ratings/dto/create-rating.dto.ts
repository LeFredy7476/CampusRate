import { IsAlpha, IsNotEmpty, IsNumber, IsString, Length, Min, Max, MaxLength } from "class-validator";
import { msg } from "../../utils.js";

export class CreateRatingDto {

    @IsString(msg("Ratings must contain a valid placeId"))
    @Length(40, 40, msg("Ratings must contain a valid placeId"))
    placeId!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    authorName!: string;

    @IsNumber()
    @Min(0)
    @Max(5)
    @IsNotEmpty()
    rating!: number;

    @IsString()
    @MaxLength(256)
    comment!: string;

}