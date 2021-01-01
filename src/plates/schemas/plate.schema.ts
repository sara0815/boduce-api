import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlateDocument = Plate & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Plate {
  @Prop()
  name: string;
}

export const PlateSchema = SchemaFactory.createForClass(Plate);
