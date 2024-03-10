import { Router, Request, Response } from 'express';
import { AuthUserController } from './controllers/user/AuthUserController';

import{CreateUserController} from './controllers/user/CreateUserController'

const router = Router();


//rotas user
router.post('/users', new CreateUserController().handle) 
router.post('/session', new AuthUserController().handle)

export { router }; 