import { PlaceCategory } from "../entities/place-category.enum.js";
import { PlaceStatus } from "../entities/place-status.enum.js";


export class CreatePlaceDto {
    name!: string;
    description!: string;
    category!: PlaceCategory;
    address!: string;
    services?: string[];
    status?: PlaceStatus;
}
