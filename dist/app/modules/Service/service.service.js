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
exports.serviceService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createService = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { bikeId, serviceDate, description, status } = payLoad;
    // Validate input
    if (!bikeId || !serviceDate || !description || !status) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "BikeId, serviceDate, description, and status are required", "BAD_REQUEST");
    }
    // Check if bike exists
    const bike = yield prisma_1.default.bike.findUnique({
        where: { bikeId },
    });
    if (!bike) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Bike not found", "NOT_FOUND");
    }
    // Validate status
    if (!["pending", "in-progress", "done"].includes(status)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Status must be "pending", "in-progress", or "done"', "BAD_REQUEST");
    }
    const service = yield prisma_1.default.serviceRecord.create({
        data: {
            bikeId,
            serviceDate: new Date(serviceDate),
            description,
            status,
        },
    });
    return service;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_1.default.serviceRecord.findMany();
    return services;
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.findUnique({
        where: { serviceId: id },
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Service record not found", "NOT_FOUND");
    }
    return result;
});
const completeService = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { completionDate } = payLoad;
    // Check if service exists
    const existingService = yield prisma_1.default.serviceRecord.findUnique({
        where: { serviceId: id },
    });
    if (!existingService) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Service record not found", "NOT_FOUND");
    }
    const updatedService = yield prisma_1.default.serviceRecord.update({
        where: { serviceId: id },
        data: {
            completionDate: completionDate ? new Date(completionDate) : new Date(),
            status: "done",
        },
    });
    return updatedService;
});
const getOverdueServices = () => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const overdueServices = yield prisma_1.default.serviceRecord.findMany({
        where: {
            status: {
                in: ["pending", "in-progress"],
            },
            serviceDate: {
                lt: sevenDaysAgo,
            },
        },
    });
    return overdueServices;
});
exports.serviceService = {
    createService,
    getAllServices,
    getServiceById,
    completeService,
    getOverdueServices,
};
