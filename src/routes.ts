import {Express, Request, Response} from 'express';
import { createUserHandler } from './controller/userController';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schema/userSchema';


const routes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })
    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
}

export default routes