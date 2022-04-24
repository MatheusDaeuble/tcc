import { Router } from 'express';
import CourseController from '../controllers/CourseController';

const courseController = new CourseController();

const coursesRouter = Router();

coursesRouter.post('/', courseController.create);
coursesRouter.get('/', courseController.index);
coursesRouter.get('/:id', courseController.show);
coursesRouter.put('/:id', courseController.update);
coursesRouter.delete('/:id', courseController.delete);

export default coursesRouter;
