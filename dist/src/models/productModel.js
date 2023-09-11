"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const generateId = () => {
    const id = (0, uuid_1.v4)();
    return id;
};
const id = generateId();
const productSchema = new mongoose_1.default.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        defualt: () => `product ${id}`,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
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
    },
}, {
    timestamps: true,
});
const ProductModel = mongoose_1.default.model("Product", productSchema);
exports.default = ProductModel;
