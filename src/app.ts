import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// import httpStatus from "http-status";
// import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors());
// app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Bike service server..",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
