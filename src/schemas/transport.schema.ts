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

  @Prop({ required: true })
  creatorId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  unitID: number[];

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop()
  deletedAt: Date;
}

export const TransportSchema = SchemaFactory.createForClass(Transport);
