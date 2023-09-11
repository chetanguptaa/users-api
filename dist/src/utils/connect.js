"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const connect = async () => {
    const dbUri = config_1.default.get("dbUri");
    try {
        await mongoose_1.default.connect(dbUri);
        logger_1.default.info("Connected to the DB");
    }
    catch (error) {
        logger_1.default.error("error connecting to the database");
        process.exit(1);
    }
};
exports.default = connect;
