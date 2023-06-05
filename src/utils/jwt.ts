import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<String>("privateKey");
const publicKey = config.get<String>("publicKey");

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined)
    {
        const signingKey = Buffer.from(
            privateKey, "base64"
        ).toString("ascii");
        return jwt.sign(object, signingKey, {
            ...(options && options),
            algorithm: 'RS256'
        })
}
export function verifyJwt(token: string) {
    try {
        const signingKey = Buffer.from(
            privateKey, "base64"
        ).toString("ascii");
        const decoded = jwt.verify(token, signingKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch(e: any) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}