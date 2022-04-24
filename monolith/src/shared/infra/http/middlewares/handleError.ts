/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export default function (
  error: Error,
  _: Request,
  response: Response,
  _next: NextFunction
): Response {
  console.log(_.originalUrl, error);

  if (error instanceof AppError)
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno de servidor',
  });
}
