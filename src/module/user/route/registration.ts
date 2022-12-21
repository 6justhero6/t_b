import * as Yup from 'yup';

import { makeSuccessResponse } from '@core/utils/makeSuccessResponse';
import { PrimaryDB } from '@core/db/PrimaryDB';
import { getHashedPassword } from '@module/user/utils/getHashedPassword';
import { makeErrorResponse } from '@core/utils/makeErrorResponse';
import { exclude } from '@core/db/exclude';
import { JWTService } from '@core/utils/getJWT';
import { getCookieOptions } from '@core/utils/getCookieOptions';
import { NextFunction, Request, Response, Router} from 'express';
import { createValidation } from '../../../middlewares/createValidation';

export const bodySchema = Yup.object()
  .shape({
    login: Yup.string().min(1).required(),
    password: Yup.string().min(2).required(),
  })
  .required();

export const registration = async (
  request: Request<any, { login: string; password: string }>,
  response: Response,
  next: NextFunction
) => {
  const { login, password } = request.body;
  const hashedPassword = getHashedPassword(password);
  try {
    const user = await PrimaryDB.client.admin.create({
      data: { login, hashedPassword },
    });
    exclude(user, ['hashedPassword']);
    const accessToken = new JWTService().getAccessToken({ id: user.id });
    response.cookie('userToken', accessToken, getCookieOptions());
    response.json(makeSuccessResponse(user));
  } catch (ex) {
    if (!ex.message.includes('Unique constraint failed')) {
      return next(ex);
    }
    return makeErrorResponse({ message: 'Login already exists' });
  }
};

const registrationRoute = (router: Router) => {
  router.post('/', createValidation({ body: bodySchema }), registration);
};

export { registrationRoute };
