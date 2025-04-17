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
exports.customerController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const customer_service_1 = require("./customer.service");
const http_status_codes_1 = require("http-status-codes");
const createCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.createCustomer(req.body);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Customer created successfully",
        data: result,
    });
}));
const getAllCustomers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.getAllCustomers();
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Customers fetched successfully",
        data: result,
    });
}));
const getCustomerById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.getCustomerById(req.params.id);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Customer fetched successfully",
        data: result,
    });
}));
const updateCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.updateCustomer(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Customer updated successfully",
        data: result,
    });
}));
const deleteCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.customerService.deleteCustomer(req.params.id);
    (0, sendResponse_1.default)(res, {
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Customer deleted successfully",
        data: result,
    });
}));
exports.customerController = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
