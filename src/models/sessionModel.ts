import mongoose from "mongoose";
import { UserDocument } from "./userModels";

export interface SessionInput {
    user: UserDocument['_id'];
    valid: Boolean;
    userAgent: String
}

export interface SchemaDocument extends mongoose.Document, SessionInput {
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    valid: {type: Boolean, default: true},
    userAgent: {type: String}
}, {
    timestamps: true
})

const SessionModel = mongoose.model("Session", sessionSchema);

export default SessionModel;