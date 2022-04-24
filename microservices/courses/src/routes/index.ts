import { Router } from 'express';
import CourseController from '../controllers/CourseController';

const userController = new CourseController();

const router = Router();

router.post('/', userController.create);
router.get('/', userController.index);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
