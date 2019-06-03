import express from "express";
import NotifikasiController from "../controllers/notifikasi";

const routes = express.Router();

routes.get("/:hak_akses/:id", NotifikasiController.index);
routes.get("/unread/:hak_akses/:id", NotifikasiController.unread);
routes.post("/mark-as-read", NotifikasiController.markAsRead);
routes.delete("/:id", NotifikasiController.delete);
routes.get("/:id", NotifikasiController.single);

export default routes;