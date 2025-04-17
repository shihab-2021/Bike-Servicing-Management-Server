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
exports.serviceController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const service_service_1 = require("./service.service");
const createCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.createService(req.body);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Service record created successfully",
        data: result,
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.getAllServices();
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Service records fetched successfully",
        data: result,
    });
}));
const getServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.getServiceById(req.params.id);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Service record fetched successfully",
        data: result,
    });
}));
const completeService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.completeService(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Service marked as completed",
        data: result,
    });
}));
const getOverdueServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.getOverdueServices();
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Overdue or pending services fetched successfully",
        data: result,
    });
}));
exports.serviceController = {
    createCustomer,
    getAllServices,
    getServiceById,
    completeService,
    getOverdueServices,
};
