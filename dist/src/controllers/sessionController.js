"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSessionHandler = exports.getUserSessionsHandler = exports.createUserSessionHandler = void 0;
const userService_1 = require("../services/userService");
const sessionService_1 = require("../services/sessionService");
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("config"));
async function createUserSessionHandler(req, res) {
    const user = await (0, userService_1.validatePassword)(req.body);
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }
    const session = await (0, sessionService_1.createSession)(user._id, req.get("user-agent") || "");
    const accessToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'accessPrivateKey', { expiresIn: config_1.default.get("accessTokenTimeToLive") });
    const refreshToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), 'refreshPrivateKey', { expiresIn: config_1.default.get("refreshTokenTimeToLive") });
    return res.send({ accessToken, refreshToken });
}
exports.createUserSessionHandler = createUserSessionHandler;
async function getUserSessionsHandler(req, res) {
    const userId = res.locals.user._id;
    const sessions = await (0, sessionService_1.findSessions)({ user: userId, valid: true });
    return res.send(sessions);
}
exports.getUserSessionsHandler = getUserSessionsHandler;
async function deleteUserSessionHandler(req, res) {
    const sessionId = res.locals.user.session;
    await (0, sessionService_1.updateSession)({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null
    });
}
exports.deleteUserSessionHandler = deleteUserSessionHandler;
