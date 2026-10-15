import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';
import { PlaceStatus } from './place-status.enum.js';
import { PlaceCategory } from './place-category.enum.js';

export type PlaceDocument = HydratedDocument<Place>;

@Schema({ timestamps: true })
export class Place {
    @Prop({ type: String, default: () => 'pla_' + randomUUID(), unique: true }) 
    id!: string;
    @Prop({ required: true, unique: true }) 
    name!: string;
    @Prop({ required: true }) 
    description!: string;
    @Prop({ required: true, type: String, enum: PlaceCategory, index: true }) 
    category!: PlaceCategory;
    @Prop({ required: true }) 
    address!: string;
    @Prop({ type: [String], default: () => [] })
    services: string[];
    @Prop({ type: String, enum: PlaceStatus, default: () => PlaceStatus.ACTIVE })
    status: PlaceStatus;
    @Prop({ type: Number, default: () => null })
    averageRating: number;
    @Prop({ default: () => 0 })
    reviewCount: number;
    @Prop({ default: () => new Date() })
    createdAt: Date;
    @Prop({ default: () => new Date() })
    updatedAt: Date;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);

PlaceSchema.pre('save', function () {
  this.updatedAt = new Date();
});