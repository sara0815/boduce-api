import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Visit {
  @Prop({ required: true })
  date: string;
  @Prop({ default: 1 })
  count: number;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
