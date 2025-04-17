"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get(bike_controller_1.bikeController.getAllBikes)
    .post(bike_controller_1.bikeController.createCustomer);
router.route("/:id").get(bike_controller_1.bikeController.getBikeById);
exports.bikeRoutes = router;
