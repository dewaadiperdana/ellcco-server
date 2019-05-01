import { Router } from 'express';
import PenggunaController from '../controller/PenggunaController';
import { RegisterValidator, LoginValidator } from '../src/validators/pengguna';

const routes = Router();

routes.post('/register', RegisterValidator.validate(), PenggunaController.register);
routes.post('/login', LoginValidator.validate(), PenggunaController.login);
routes.get('/verifikasi/:token', PenggunaController.verifikasi);
routes.get('/hakakses', PenggunaController.getHakAkses);

export default routes;