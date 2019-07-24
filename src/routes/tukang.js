import express from 'express';
import TukangController from '../controllers/tukangController';
import {
  RegisterValidator,
  LoginValidator,
  EditProfileValidator
} from '../middlewares/validators/akun';

const routes = express.Router();

routes.post(
  '/register',
  RegisterValidator.validate('tukang'),
  TukangController.register
);
routes.post('/login', LoginValidator.validate(), TukangController.login);
routes.post('/is-authenticated', TukangController.checkIsAuthenticated);
routes.get('/verifikasi/:token', TukangController.verifikasi);
routes.put(
  '/edit-profile/:id',
  EditProfileValidator.validate('tukang'),
  TukangController.editProfile
);
routes.get('/account-list', TukangController.accountList);
routes.get('/counts', TukangController.counts);
routes.post('/account-status', TukangController.accountStatus);

export default routes;
