import { msg } from "../../utils.js";
import { PlaceCategory } from "../entities/place-category.enum.js";
import { PlaceStatus } from "../entities/place-status.enum.js";
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';


export class CreatePlaceDto {

    @IsString()
    @IsNotEmpty(msg("A name must be provided"))
    @MaxLength(32, msg("Name has a maximum of 32 character"))
    name!: string;

    @IsString()
    @MaxLength(256, msg("Descrpition has a maximum of 256 character"))
    description!: string;

    @IsNotEmpty(msg("Invalid place category"))
    @IsEnum(PlaceCategory, msg("Invalid place category"))
    category!: PlaceCategory;

    @IsString(msg("Address must be in the code format ex: A-001"))
    @IsNotEmpty(msg("Address must be in the code format ex: A-001"))
    @MaxLength(5, msg("Address must be in the code format ex: A-001"))
    address!: string;

    @IsArray()
    @MaxLength(32, { each: true })
    @IsOptional()
    services?: string[];

    @IsOptional()
    @IsEnum(PlaceStatus, msg("Invalid place status"))
    status?: PlaceStatus;

}
