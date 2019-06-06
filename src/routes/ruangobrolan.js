import express from "express";
import RuangObrolanController from "../controllers/ruangobrolan";

const routes = express.Router();

routes.get("/by-pemesanan/:id", RuangObrolanController.index);
routes.get(
  "/pesan/:hak_akses/:id_ruang_obrolan/:id_akun",
  RuangObrolanController.pesanObrolan
);

export default routes;
