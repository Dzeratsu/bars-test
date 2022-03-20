import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Transport } from './transport.schema';
import { User } from '../schemas/user.schema';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop()
  id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creatorId: User;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transport' }] })
  unitId: Transport;

  @Prop({ default: new Date() })
  createdAt: string;

  @Prop()
  updatedAt: string;
}
export const GroupSchema = SchemaFactory.createForClass(Group);
