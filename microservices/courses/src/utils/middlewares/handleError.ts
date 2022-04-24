/* eslint-disable no-console */
import AppError from '@utils/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default function (
  error: Error,
  _: Request,
  response: Response,
  _next: NextFunction
): Response {
  if (error instanceof AppError)
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });

  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno de servidor',
  });
}
