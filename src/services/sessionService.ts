import { FilterQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/sessionModel';


export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({user: userId, userAgent});
    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    const session = await SessionModel.find(query).lean();
    return session;
}

export async function deleteSession(query: FilterQuery<SessionDocument>) {
    const session = await SessionModel.find(query).lean();
    SessionModel.deleteOne(session);
    return session;
}