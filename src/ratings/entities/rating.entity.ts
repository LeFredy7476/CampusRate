import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';

export type RatingDocument = HydratedDocument<Rating>;

@Schema({ timestamps: true })
export class Rating {
    @Prop({ type: String, default: () => 'rev_' + randomUUID(), unique: true }) 
    id!: string;
    @Prop({ required: true }) 
    placeId!: string;
    @Prop({ required: true }) 
    authorName!: string;
    @Prop({ required: true }) 
    rating!: number;
    @Prop({ required: true }) 
    comment!: string;
    @Prop({ default: () => new Date() })
    createdAt!: Date;
    @Prop({ default: () => new Date() })
    updatedAt!: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

RatingSchema.pre('save', function () {
  this.updatedAt = new Date();
});