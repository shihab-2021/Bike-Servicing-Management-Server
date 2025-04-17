import express from "express";
import { serviceController } from "./service.controller";

const router = express.Router();

router
  .route("/")
  .get(serviceController.getAllServices)
  .post(serviceController.createCustomer);

router.route("/status").get(serviceController.getOverdueServices);

router.route("/:id").get(serviceController.getServiceById);

router.route("/:id/complete").put(serviceController.completeService);

export const serviceRoutes = router;
