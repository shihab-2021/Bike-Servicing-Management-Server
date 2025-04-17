import express from "express";
import { bikeController } from "./bike.controller";

const router = express.Router();

router
  .route("/")
  .get(bikeController.getAllBikes)
  .post(bikeController.createCustomer);

router.route("/:id").get(bikeController.getBikeById);

export const bikeRoutes = router;
