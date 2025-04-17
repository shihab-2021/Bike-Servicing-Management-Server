import express, { NextFunction, Request, Response } from "express";
import { customerController } from "./customer.controller";

const router = express.Router();

router
  .route("/")
  .get(customerController.getAllCustomers)
  .post(customerController.createCustomer);

router
  .route("/:id")
  .get(customerController.getCustomerById)
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

export const customerRoutes = router;
