import { Router } from 'express';
import NotifikasiController from '../controllers/NotifikasiController';
import { AuthorizationMiddleware } from '../middlewares';

const router = Router();

router.get('/:id_pengguna', [
  AuthorizationMiddleware.isAuthenticated
], NotifikasiController.getNotifikasiPengguna);

router.post('/mark-as-read', [
  AuthorizationMiddleware.isAuthenticated
], NotifikasiController.tandaiSudahDibaca);

router.get('/get-unread-notification/:id_pengguna', [
  AuthorizationMiddleware.isAuthenticated
], NotifikasiController.getNotifikasiBelumDibaca);

export default router;