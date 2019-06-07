import express from "express";
import DetailPerbaikanController from "../controllers/detailperbaikan";
import { StoreDetailPerbaikanValidator } from "../middlewares/validators/detailperbaikan";

const routes = express.Router();

routes.post(
  "/add",
  StoreDetailPerbaikanValidator.validate(),
  DetailPerbaikanController.store
);
routes.delete("/delete/:id", DetailPerbaikanController.delete);
routes.get("/:id_pemesanan", DetailPerbaikanController.list);

export default routes;
