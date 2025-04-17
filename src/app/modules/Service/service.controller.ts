import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { serviceService } from "./service.service";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.createService(req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Service record created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getAllServices();
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Service records fetched successfully",
    data: result,
  });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getServiceById(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Service record fetched successfully",
    data: result,
  });
});

const completeService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.completeService(req.params.id, req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Service marked as completed",
    data: result,
  });
});

const getOverdueServices = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getOverdueServices();
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Overdue or pending services fetched successfully",
    data: result,
  });
});

export const serviceController = {
  createCustomer,
  getAllServices,
  getServiceById,
  completeService,
  getOverdueServices,
};
