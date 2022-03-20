import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Group } from './group.schema';

export type TransportDocument = Transport & Document;

@Schema()
export class Transport {
  @Prop()
  id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creatorId: User;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] })
  unitID: Group;

  @Prop({ default: new Date() })
  createdAt: string;
}

export const TransportSchema = SchemaFactory.createForClass(Transport);
