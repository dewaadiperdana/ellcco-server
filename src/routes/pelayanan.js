import express from "express";
import PelayananController from "../controllers/pelayanan";

const routes = express.Router();

routes.get("/list/:id_tukang", PelayananController.list);
routes.post("/add", PelayananController.store);
routes.delete("/delete/:id", PelayananController.delete);

export default routes;