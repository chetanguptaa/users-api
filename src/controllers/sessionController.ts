import {Request, Response} from 'express';
import { validatePassword } from '../services/userService';
import { createSession, findSessions, deleteSession } from '../services/sessionService';
import { signJwt } from '../utils/jwt';
import  config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);
    if(!user) {
        return res.status(401).send('Invalid email or password');
    }
    const session = await createSession(user._id, req.get("user-agent") || "") ;
    const accessToken = signJwt(
        { ...user, 
          session: session._id,
        },'accessPrivateKey',
        { expiresIn: config.get<string>("accessTokenTimeToLive") }
    );
    const refreshToken = signJwt(
        { ...user, 
          session: session._id,
        },'refreshPrivateKey',
        { expiresIn: config.get<string>("refreshTokenTimeToLive") }
    );

    return res.send({accessToken,refreshToken})
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const sessions = await findSessions({user: userId, valid: true});
    return res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const session = await deleteSession({user: userId, valid: true});
  return res.send();
}