"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const bike_service_1 = require("./bike.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.createBike(req.body);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Bike added successfully",
        data: result,
    });
}));
const getAllBikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.getAllBikes();
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Bikes fetched successfully",
        data: result,
    });
}));
const getBikeById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.getBikeById(req.params.id);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Bike fetched successfully",
        data: result,
    });
}));
exports.bikeController = { createCustomer, getAllBikes, getBikeById };
