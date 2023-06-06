import {Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../services/sessionService";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, "header.autorization", "").replace(
        /^Bearer\s/,
        ""
    );
    const refreshToken = get(req, "header.x-refresh");
    if(!accessToken) {
        return next();
    }
    const { decoded, expired } = verifyJwt(accessToken, "accessPublicKey");
    if(decoded) {
        res.locals.user = decoded;
        return next();
    }
    if(expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({refreshToken});
        if(newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }
        const result = verifyJwt(newAccessToken as string, "accessPublicKey");
        res.locals.user = result.decoded;
        return next();
    }
    return next();
}

export default deserializeUser;