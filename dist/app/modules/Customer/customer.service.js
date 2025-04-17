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
exports.customerService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createCustomer = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = payLoad;
    // Validate input
    if (!name || !email || !phone) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Name, email, and phone are required", "BAD_REQUEST");
    }
    // Check if email already exists
    const existingCustomer = yield prisma_1.default.customer.findUnique({
        where: { email },
    });
    if (existingCustomer) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Email already in use", "BAD_REQUEST");
    }
    const customer = yield prisma_1.default.customer.create({
        data: {
            name,
            email,
            phone,
        },
    });
    return customer;
});
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield prisma_1.default.customer.findMany();
    return customers;
});
const getCustomerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.default.customer.findUnique({
        where: { customerId: id },
    });
    if (!customer) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Customer not found", "NOT_FOUND");
    }
    return customer;
});
const updateCustomer = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.customer.findUniqueOrThrow({
            where: { customerId: id },
        });
        const updatedCustomer = yield transactionClient.customer.update({
            where: { customerId: id },
            data: payLoad,
        });
        return updatedCustomer;
    }));
    return result;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if customer exists
    const existingCustomer = yield prisma_1.default.customer.findUnique({
        where: { customerId: id },
    });
    if (!existingCustomer) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Customer not found!", "NOT_FOUND");
    }
    const result = yield prisma_1.default.customer.delete({
        where: { customerId: id },
    });
    return result;
});
exports.customerService = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
