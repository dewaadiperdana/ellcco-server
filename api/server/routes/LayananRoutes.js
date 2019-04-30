import { Router } from 'express';
import LayananController from '../controller/LayananController';

const router = Router();

router.get('/', LayananController.getAllLayanan);

export default router;