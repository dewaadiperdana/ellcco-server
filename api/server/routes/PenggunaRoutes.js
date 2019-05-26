import { Router } from 'express';
import PenggunaController from '../controllers/PenggunaController';
import { RegisterValidator, LoginValidator } from '../validators/pengguna';

const routes = Router();

routes.post('/register', RegisterValidator.validate(), PenggunaController.register);
routes.post('/login', LoginValidator.validate(), PenggunaController.login);
routes.get('/verifikasi/:token', PenggunaController.verifikasi);
routes.get('/hakakses', PenggunaController.getHakAkses);
routes.post('/is-authenticated', PenggunaController.isAuthenticated);

export default routes;