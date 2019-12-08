import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status-codes';
import createError, { HttpError } from 'http-errors';

export const noMatchRouteHandler = (request: Request, response: Response, next: NextFunction): void => {
  if (!response.locals.hasPassedRoute) {
    next(createError(NOT_FOUND));
  }
  next();
};

export const resultHandler = (request: Request, response: Response): void => {
  const resultInfo = response.locals.result || {};
  const status = response.locals.result.status || OK;
  if (response.headersSent) {
    return;
  }
  response.send(status).json({
    result: resultInfo,
  });
};

export const errorHandler = (error: HttpError, request: Request, response: Response, next: NextFunction): void => {
  const status: number = error.status || INTERNAL_SERVER_ERROR;
  if (response.headersSent) {
    return;
  }
  if (error.detail) {
    response.status(status).json({
      message: error.message,
      detail: error.detail,
    });
  } else {
    response.status(status).json({ message: error.message });
  }
};
