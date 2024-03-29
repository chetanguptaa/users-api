import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/sessionModel";
import { signJwt, verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import config from "config";
import { findUser } from "./userService";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  const session = await SessionModel.find(query).lean();
  return session;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, "refreshPublicKey");
  if (!decoded || !get(decoded, "session")) return false;
  const session = await SessionModel.findById(get(decoded, "session"));
  if (!session || !session.valid) return false;
  const user = await findUser({ _id: session.user });
  if (!user) return false;
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    "accessPrivateKey",
    { expiresIn: config.get("accessTokenTimeToLive") }
  );
  return accessToken;
}
