import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { bikeService } from "./bike.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await bikeService.createBike(req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Bike added successfully",
    data: result,
  });
});

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const result = await bikeService.getAllBikes();
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Bikes fetched successfully",
    data: result,
  });
});

const getBikeById = catchAsync(async (req: Request, res: Response) => {
  const result = await bikeService.getBikeById(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Bike fetched successfully",
    data: result,
  });
});

export const bikeController = { createCustomer, getAllBikes, getBikeById };
