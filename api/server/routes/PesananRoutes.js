import { Router } from 'express';
import PesananController from '../controller/PesananController';
import { AuthorizationMiddleware, PelangganMiddleware } from '../middlewares';
import { PesanValidator } from '../validators/pesanan';

const router = Router();

router.post('/pesan', [
  AuthorizationMiddleware.isAuthenticated,
  PelangganMiddleware.isPelanggan,
  PesanValidator.validate()
], PesananController.pesan);
router.post('/terima', [], PesananController.terima);

export default router;