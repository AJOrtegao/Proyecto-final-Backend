import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Product extends Document {
  _id: string;  
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

export const ProductModel = mongoose.model<Product>('Product', productSchema);
