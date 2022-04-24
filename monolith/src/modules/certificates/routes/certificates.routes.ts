import { Router } from 'express';
import CertificateController from '../controllers/CertificateController';

const certificateController = new CertificateController();

const certificatesRouter = Router();

certificatesRouter.use('/', certificateController.create);

export default certificatesRouter;
