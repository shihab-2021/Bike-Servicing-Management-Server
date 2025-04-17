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
exports.bikeService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createBike = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { brand, model, year, customerId } = payLoad;
    // Validate input
    if (!brand || !model || !year || !customerId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Brand, model, year, and customerId are required", "BAD_REQUEST");
    }
    // Check if customer exists
    const customer = yield prisma_1.default.customer.findUnique({
        where: { customerId },
    });
    if (!customer) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Customer not found", "NOT_FOUND");
    }
    const bike = yield prisma_1.default.bike.create({
        data: {
            brand,
            model,
            year,
            customerId,
        },
    });
    return bike;
});
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const bikes = yield prisma_1.default.bike.findMany();
    return bikes;
});
const getBikeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield prisma_1.default.bike.findUnique({
        where: { bikeId: id },
    });
    if (!bike) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Bike not found", "NOT_FOUND");
    }
    return bike;
});
exports.bikeService = { createBike, getAllBikes, getBikeById };
