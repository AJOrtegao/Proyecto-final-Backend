import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface User extends Document {
  _id: string;  
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },  // O 'admin' según tus necesidades
});

export const UserModel = mongoose.model<User>('User', userSchema);
