import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import {makeErrorResponse} from '@core/utils/makeErrorResponse';

export function createValidation(options: {
  body?: Yup.AnySchema;
  params?: Yup.AnySchema;
}) {
  return async function validate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (options.body) {
        request.body = await options.body.validate(request.body);
      }
      if (options.params) {
        request.params = await options.params.validate(request.params);
      }
    } catch (ex) {
      return response.status(400).json(makeErrorResponse(ex.message));
    }
    next();
  };
}
