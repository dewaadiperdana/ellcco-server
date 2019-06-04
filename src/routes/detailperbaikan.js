import express from "express";
import DetailPerbaikanController from "../controllers/detailperbaikan";

const routes = express.Router();

routes.post("/add", DetailPerbaikanController.store);
routes.delete("/delete/:id", DetailPerbaikanController.delete);
routes.get("/:id_pemesanan", DetailPerbaikanController.list);

export default routes;
