import { Router } from "express";
import {
  findById,
  createFavs,
  getAllFavs,
  getOneFavs,
  updateFavs,
  deleteFavs,
} from "../controllers/favs.controller.js";

const favsRouter = Router();

favsRouter.param("id", findById);
favsRouter.route("/api/favs").post(createFavs).get(getAllFavs);
favsRouter
  .route("/api/favs/:id")
  .get(getOneFavs)
  .put(updateFavs)
  .delete(deleteFavs);

//
export default favsRouter;
