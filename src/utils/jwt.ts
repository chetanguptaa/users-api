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
            ...(options && options)
        })
}
export function verifyJwt(token: string) {
    const signingKey = Buffer.from(
        publicKey, "base64"
    ).toString("ascii");
    try {
        const decoded = jwt.verify(token, signingKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch(e: any) {
        console.log(e);
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}