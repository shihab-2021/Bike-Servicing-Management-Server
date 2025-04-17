import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import prisma from "../../shared/prisma";
import { Customer } from "../../../../generated/prisma";

const createCustomer = async (payLoad: Customer) => {
  const { name, email, phone } = payLoad;

  // Validate input
  if (!name || !email || !phone) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Name, email, and phone are required",
      "BAD_REQUEST"
    );
  }

  // Check if email already exists
  const existingCustomer = await prisma.customer.findUnique({
    where: { email },
  });

  if (existingCustomer) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Email already in use",
      "BAD_REQUEST"
    );
  }

  const customer = await prisma.customer.create({
    data: {
      name,
      email,
      phone,
    },
  });

  return customer;
};

const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany();
  return customers;
};

const getCustomerById = async (id: string) => {
  const customer = await prisma.customer.findUnique({
    where: { customerId: id },
  });

  if (!customer) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Customer not found",
      "NOT_FOUND"
    );
  }

  return customer;
};

const updateCustomer = async (id: string, payLoad: Partial<Customer>) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.customer.findUniqueOrThrow({
      where: { customerId: id },
    });

    const updatedCustomer = await transactionClient.customer.update({
      where: { customerId: id },
      data: payLoad,
    });

    return updatedCustomer;
  });

  return result;
};

const deleteCustomer = async (id: string) => {
  // Check if customer exists
  const existingCustomer = await prisma.customer.findUnique({
    where: { customerId: id },
  });

  if (!existingCustomer) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Customer not found!",
      "NOT_FOUND"
    );
  }

  const result = await prisma.customer.delete({
    where: { customerId: id },
  });

  return result;
};

export const customerService = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
