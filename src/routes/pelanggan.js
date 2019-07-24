import express from "express";
import PelangganController from "../controllers/pelangganController";
import {
  RegisterValidator,
  LoginValidator,
  EditProfileValidator
} from "../middlewares/validators/akun";

const routes = express.Router();

routes.post(
  '/register',
  RegisterValidator.validate('pelanggan'),
  PelangganController.register
);
routes.post('/login', LoginValidator.validate(), PelangganController.login);
routes.post('/is-authenticated', PelangganController.checkIsAuthenticated);
routes.get('/verifikasi/:token', PelangganController.verifikasi);
routes.put(
  '/edit-profile/:id',
  EditProfileValidator.validate('pelanggan'),
  PelangganController.editProfile
);
routes.get('/account-list', PelangganController.accountList);
routes.get('/counts', PelangganController.counts);
routes.post('/account-status', PelangganController.accountStatus);

export default routes;
