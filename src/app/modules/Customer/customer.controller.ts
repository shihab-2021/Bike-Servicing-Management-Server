import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { customerService } from "./customer.service";
import { StatusCodes } from "http-status-codes";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.createCustomer(req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Customer created successfully",
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.getAllCustomers();
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Customers fetched successfully",
    data: result,
  });
});

const getCustomerById = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.getCustomerById(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Customer fetched successfully",
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.updateCustomer(req.params.id, req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Customer updated successfully",
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.deleteCustomer(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Customer deleted successfully",
    data: result,
  });
});

export const customerController = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
