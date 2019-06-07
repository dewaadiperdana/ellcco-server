import express from "express";
import PelangganController from "../controllers/pelanggan";
import {
  RegisterValidator,
  LoginValidator,
  EditProfileValidator
} from "../middlewares/validators/akun";

const routes = express.Router();

routes.post(
  "/register",
  RegisterValidator.validate("pelanggan"),
  PelangganController.register
);
routes.post("/login", LoginValidator.validate(), PelangganController.login);
routes.post("/is-authenticated", PelangganController.checkIsAuthenticated);
routes.get("/verifikasi/:token", PelangganController.verifikasi);
routes.put(
  "/edit-profile/:id",
  EditProfileValidator.validate("pelanggan"),
  PelangganController.editProfile
);

export default routes;
