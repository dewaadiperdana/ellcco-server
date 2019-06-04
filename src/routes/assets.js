import express from "express";
import path from "path";
import { Helpers } from "../utils";

const routes = express.Router();

routes.get("/:width/:height/:asset_name", (req, res) => {
  res.render("asset", {
    params: req.params,
    imageSource: Helpers.appUrl() + "images/" + req.params.asset_name
  });
});

export default routes;