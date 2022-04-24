import usersRouter from '@modules/users/routes/users.routes';
import certificatesRouter from '@modules/certificates/routes/certificates.routes';
import { Router } from 'express';
import coursesRouter from '@modules/courses/routes/users.routes';

const router = Router();

router.use('/status', (_, response) => response.json({ status: true }));

router.use('/users', usersRouter);
router.use('/certificates', certificatesRouter);
router.use('/courses', coursesRouter);

export default router;
