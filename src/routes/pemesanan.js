import express from "express";
import PemesananController from "../controllers/pemesanan";
import {
  PesanValidator,
  AddBiayaValidator
} from "../middlewares/validators/pemesanan";

const routes = express.Router();

routes.post("/pesan", [PesanValidator.validate()], PemesananController.pesan);
routes.put("/status", PemesananController.updateStatus);
routes.get("/status/:id", PemesananController.status);
routes.post("/terima", PemesananController.terima);
routes.post(
  "/biaya",
  AddBiayaValidator.validate(),
  PemesananController.addBiaya
);
routes.get("/perbaikan/detail/:id", PemesananController.getDetail);
routes.get("/histori/:tipe/:id", PemesananController.histori);
routes.get("/:id", PemesananController.detail);

export default routes;
