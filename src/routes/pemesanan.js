import express from 'express';
import PemesananController from '../controllers/pemesanan';
import { PesanValidator } from '../middlewares/validators/pemesanan';

const routes = express.Router();

routes.post('/pesan', [PesanValidator.validate()], PemesananController.pesan);
routes.get('/status', PemesananController.status);
routes.post('/terima', PemesananController.terima);
routes.get('/histori/:tipe/:id', PemesananController.histori);
routes.get('/:id', PemesananController.detail);

export default routes;