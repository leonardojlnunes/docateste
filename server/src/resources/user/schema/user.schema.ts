import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  cpf: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(uniqueValidator, { message: '[[{PATH} deve ser único]]' });
