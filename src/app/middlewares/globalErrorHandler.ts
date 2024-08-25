/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';
import handleMongooseValidationError from '../errors/handleMongooseValidationError';
import handleMongooseCastError from '../errors/handleMongooseCastError';
import handleDuplicateKeyError from '../errors/handleDuplicateKeyError';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number = 500;
  let message: string = 'Something went wrong!';
  let errorType: string = 'Internal Server Error.';

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorType = simplifiedError.errorType;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleMongooseValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorType = simplifiedError.errorType;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleMongooseCastError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorType = simplifiedError.errorType;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateKeyError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorType = simplifiedError.errorType;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    // @ts-ignore
    errorType = httpStatus[statusCode];
  } else if (error instanceof Error) {
    message = error?.message;
    errorType = error?.name || 'Error';
  }

  // Ultimate Return
  return res.status(statusCode).json({
    success: false,
    message,
    errorType,
    stack: config.node_env === 'development' ? error?.stack : null,
    error,
  });
};

export default globalErrorHandler;
