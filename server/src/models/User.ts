import { Schema, model } from 'mongoose';


export interface UserFields {
  name: string;
  email: string;
  password: string;
}

export interface User extends UserFields {
  _id: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>('User', userSchema);