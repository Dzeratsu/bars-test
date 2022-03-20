import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  lastLoginAt: string;

  @Prop({ default: new Date() })
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop()
  deletedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
