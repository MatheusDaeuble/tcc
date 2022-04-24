import { Router } from 'express';
import UserController from '../controllers/UserController';
import RegistrationController from '../controllers/RegistrationController';

const userController = new UserController();
const registrationController = new RegistrationController();

const router = Router();

router.post('/', userController.create);
router.get('/', userController.index);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.post('/registration', registrationController.create);

export default router;
