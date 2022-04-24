import { Router } from 'express';
import CertificateController from '../controllers/CertificateController';

const certificateController = new CertificateController();

const router = Router();

router.use('/', certificateController.create);

export default router;
