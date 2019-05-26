import express from 'express';
import PelangganController from '../controllers/pelanggan';
import { RegisterValidator, LoginValidator } from '../middlewares/validators/akun';

const routes = express.Router();

routes.post('/register', RegisterValidator.validate('pelanggan'), PelangganController.register);
routes.post('/login', LoginValidator.validate(), PelangganController.login);
routes.post('/is-authenticated', PelangganController.checkIsAuthenticated);
routes.get('/verifikasi/:token', PelangganController.verifikasi)

export default routes;