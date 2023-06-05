import {Express, Request, Response} from 'express';
import { createUserHandler } from './controllers/userController';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schemas/userSchema';
import { createUserSessionHandler } from './controllers/sessionController';
import { createSessionSchema } from './schemas/sessionSchema';

const routes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })
    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler )
}

export default routes