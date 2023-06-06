import mongoose from 'mongoose';
import { UserDocument } from './userModel';
import { v4 as uuidv4 } from 'uuid';

const generateId = () => {
  const id = uuidv4();
  return id;
};

const id = generateId();

export interface ProductInput {
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
}

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        defualt: () => `product ${id}`,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
},
    {
    timestamps: true,
    }
)

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;