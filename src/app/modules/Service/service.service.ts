import { StatusCodes } from "http-status-codes";
import { ServiceRecord } from "../../../../generated/prisma";
import AppError from "../../errors/AppError";
import prisma from "../../shared/prisma";

const createService = async (payLoad: ServiceRecord) => {
  const { bikeId, serviceDate, description, status } = payLoad;

  if (!bikeId || !serviceDate || !description || !status) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "BikeId, serviceDate, description, and status are required",
      "BAD_REQUEST"
    );
  }

  // Check if bike exists
  const bike = await prisma.bike.findUnique({
    where: { bikeId },
  });

  if (!bike) {
    throw new AppError(StatusCodes.NOT_FOUND, "Bike not found", "NOT_FOUND");
  }

  // Validate status
  if (!["pending", "in-progress", "done"].includes(status)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Status must be "pending", "in-progress", or "done"',
      "BAD_REQUEST"
    );
  }

  const service = await prisma.serviceRecord.create({
    data: {
      bikeId,
      serviceDate: new Date(serviceDate),
      description,
      status,
    },
  });

  return service;
};

const getAllServices = async () => {
  const services = await prisma.serviceRecord.findMany();

  return services;
};

const getServiceById = async (id: string) => {
  const result = await prisma.serviceRecord.findUnique({
    where: { serviceId: id },
  });

  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Service record not found",
      "NOT_FOUND"
    );
  }

  return result;
};

const completeService = async (id: string, payLoad: Partial<ServiceRecord>) => {
  const { completionDate } = payLoad;

  // Check if service exists
  const existingService = await prisma.serviceRecord.findUnique({
    where: { serviceId: id },
  });

  if (!existingService) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Service record not found",
      "NOT_FOUND"
    );
  }

  const updatedService = await prisma.serviceRecord.update({
    where: { serviceId: id },
    data: {
      completionDate: completionDate ? new Date(completionDate) : new Date(),
      status: "done",
    },
  });

  return updatedService;
};

const getOverdueServices = async () => {
  // Calculate date 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const overdueServices = await prisma.serviceRecord.findMany({
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
};

export const serviceService = {
  createService,
  getAllServices,
  getServiceById,
  completeService,
  getOverdueServices,
};
