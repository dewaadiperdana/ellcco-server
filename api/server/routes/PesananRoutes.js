import { Router } from 'express';
import PesananController from '../controller/PesananController';
import { AuthorizationMiddleware, PelangganMiddleware } from '../middlewares';

const router = Router();

router.post('/pesan', [
  AuthorizationMiddleware.isAuthenticated,
  PelangganMiddleware.isPelanggan
], PesananController.pesan);
router.post('/terima', [], PesananController.terima);

export default router;