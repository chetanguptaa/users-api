"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payLoad = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required",
        }),
        description: (0, zod_1.string)({
            required_error: "Description is required",
        }).min(120, "Description should be atleast 120 character long"),
        price: (0, zod_1.number)({
            required_error: "Price is required",
        }),
        image: (0, zod_1.string)({
            required_error: "Image is required",
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: "ProductId is required",
        }),
    }),
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payLoad));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payLoad), params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getProductSchema = (0, zod_1.object)(Object.assign({}, params));
