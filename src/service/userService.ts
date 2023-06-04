import { FilterQuery } from 'mongoose'
import UserModel, { UserDocument, UserInput } from "../models/userModels";
import { omit } from 'lodash';

export async function createUser(input: UserInput) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");
    } catch(e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({email, password}: {email: string, password: string}) {
    const user = await UserModel.findOne({ email })
    if(!user) { 
        return false;
    }
    const isValid = await user.comparePassword(password);
}