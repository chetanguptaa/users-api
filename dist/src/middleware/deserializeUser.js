"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_1 = require("../utils/jwt");
const sessionService_1 = require("../services/sessionService");
const deserializeUser = async (req, res, next) => {
    const accessToken = (0, lodash_1.get)(req, "header.autorization", "").replace(/^Bearer\s/, "");
    const refreshToken = (0, lodash_1.get)(req, "header.x-refresh");
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = (0, jwt_1.verifyJwt)(accessToken, "accessPublicKey");
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = await (0, sessionService_1.reIssueAccessToken)({ refreshToken });
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }
        const result = (0, jwt_1.verifyJwt)(newAccessToken, "accessPublicKey");
        res.locals.user = result.decoded;
        return next();
    }
    return next();
};
exports.default = deserializeUser;
