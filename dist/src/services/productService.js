"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.findAndUpdateProduct = exports.findProduct = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const metrics_1 = require("../utils/metrics");
async function createProduct(input) {
    const metricsLabels = {
        operation: "createProduct",
    };
    const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
    try {
        const result = await productModel_1.default.create(input);
        timer(Object.assign(Object.assign({}, metricsLabels), { success: "true" }));
        return result;
    }
    catch (e) {
        timer(Object.assign(Object.assign({}, metricsLabels), { success: "false" }));
        throw e;
    }
}
exports.createProduct = createProduct;
async function findProduct(query, options = { lean: true }) {
    const metricsLabels = {
        operation: "findProduct",
    };
    const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
    try {
        const result = await productModel_1.default.findOne(query, {}, options);
        timer(Object.assign(Object.assign({}, metricsLabels), { success: "true" }));
        return result;
    }
    catch (e) {
        timer(Object.assign(Object.assign({}, metricsLabels), { success: "false" }));
        throw e;
    }
}
exports.findProduct = findProduct;
async function findAndUpdateProduct(query, update, options) {
    return productModel_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdateProduct = findAndUpdateProduct;
async function deleteProduct(query) {
    return productModel_1.default.deleteOne(query);
}
exports.deleteProduct = deleteProduct;
