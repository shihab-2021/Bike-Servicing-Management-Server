import { StatusCodes } from "http-status-codes";
import { Bike } from "../../../../generated/prisma";
import AppError from "../../errors/AppError";
import prisma from "../../shared/prisma";

const createBike = async (payLoad: Bike) => {
  const { brand, model, year, customerId } = payLoad;

  // Validate input
  if (!brand || !model || !year || !customerId) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Brand, model, year, and customerId are required",
      "BAD_REQUEST"
    );
  }

  // Check if customer exists
  const customer = await prisma.customer.findUnique({
    where: { customerId },
  });

  if (!customer) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Customer not found",
      "NOT_FOUND"
    );
  }

  const bike = await prisma.bike.create({
    data: {
      brand,
      model,
      year,
      customerId,
    },
  });

  return bike;
};

const getAllBikes = async () => {
  const bikes = await prisma.bike.findMany();

  return bikes;
};

const getBikeById = async (id: string) => {
  const bike = await prisma.bike.findUnique({
    where: { bikeId: id },
  });

  if (!bike) {
    throw new AppError(StatusCodes.NOT_FOUND, "Bike not found", "NOT_FOUND");
  }

  return bike;
};

export const bikeService = { createBike, getAllBikes, getBikeById };
