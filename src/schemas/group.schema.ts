import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Transport } from './transport.schema';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  creatorId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  unitId: number[];

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const GroupSchema = SchemaFactory.createForClass(Group);
