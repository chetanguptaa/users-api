"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reIssueAccessToken = exports.updateSession = exports.findSessions = exports.createSession = void 0;
const sessionModel_1 = __importDefault(require("../models/sessionModel"));
const jwt_1 = require("../utils/jwt");
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const userService_1 = require("./userService");
async function createSession(userId, userAgent) {
    const session = await sessionModel_1.default.create({ user: userId, userAgent });
    return session.toJSON();
}
exports.createSession = createSession;
async function findSessions(query) {
    const session = await sessionModel_1.default.find(query).lean();
    return session;
}
exports.findSessions = findSessions;
async function updateSession(query, update) {
    return sessionModel_1.default.updateOne(query, update);
}
exports.updateSession = updateSession;
async function reIssueAccessToken({ refreshToken, }) {
    const { decoded } = (0, jwt_1.verifyJwt)(refreshToken, "refreshPublicKey");
    if (!decoded || !(0, lodash_1.get)(decoded, "session"))
        return false;
    const session = await sessionModel_1.default.findById((0, lodash_1.get)(decoded, "session"));
    if (!session || !session.valid)
        return false;
    const user = await (0, userService_1.findUser)({ _id: session.user });
    if (!user)
        return false;
    const accessToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "accessPrivateKey", { expiresIn: config_1.default.get("accessTokenTimeToLive") });
    return accessToken;
}
exports.reIssueAccessToken = reIssueAccessToken;
