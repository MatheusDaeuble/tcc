import { Router } from 'express';
import RegistrationController from '../controllers/RegistrationController';
import UserController from '../controllers/UserController';

const userController = new UserController();
const registrationController = new RegistrationController();

const usersRouter = Router();

usersRouter.post('/', userController.create);
usersRouter.get('/', userController.index);
usersRouter.get('/:id', userController.show);
usersRouter.put('/:id', userController.update);
usersRouter.delete('/:id', userController.delete);
usersRouter.post('/registration', registrationController.create);

export default usersRouter;
