"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get(service_controller_1.serviceController.getAllServices)
    .post(service_controller_1.serviceController.createCustomer);
router.route("/status").get(service_controller_1.serviceController.getOverdueServices);
router.route("/:id").get(service_controller_1.serviceController.getServiceById);
router.route("/:id/complete").put(service_controller_1.serviceController.completeService);
exports.serviceRoutes = router;
