import express from 'express';
import TukangController from '../controllers/tukang';
import { RegisterValidator, LoginValidator } from '../middlewares/validators/akun';

const routes = express.Router();

routes.post('/register', RegisterValidator.validate('tukang'), TukangController.register);
routes.post('/login', LoginValidator.validate(), TukangController.login);
routes.post('/is-authenticated', TukangController.checkIsAuthenticated);
routes.get('/verifikasi/:token', TukangController.verifikasi)

export default routes;