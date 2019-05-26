import express from 'express';
import PemesananController from '../controllers/pemesanan';
import { PesanValidator } from '../middlewares/validators/pemesanan';

const routes = express.Router();

routes.post('/pesan', [PesanValidator.validate()], PemesananController.pesan);
routes.post('/terima', PemesananController.terima);
routes.post('/histori/:id_pesanan/:hak_akses/:id_akun', PemesananController.histori);

export default routes;