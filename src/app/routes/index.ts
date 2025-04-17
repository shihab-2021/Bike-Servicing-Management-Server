import express from "express";
import { customerRoutes } from "../modules/Customer/customer.route";
import { bikeRoutes } from "../modules/Bike/bike.route";
import { serviceRoutes } from "../modules/Service/service.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/customers",
    route: customerRoutes,
  },
  {
    path: "/bikes",
    route: bikeRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
