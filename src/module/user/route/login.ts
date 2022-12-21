import { Request, Response, Router } from 'express';

import { makeSuccessResponse } from '@core/utils/makeSuccessResponse';
import { PrimaryDB } from '@core/db/PrimaryDB';
import { bodySchema as registrationBodySchema } from '@module/user/route/registration';
import { hashPassword } from '@module/user/utils/hashPassword';
import { exclude } from '@core/db/exclude';
import { JWTService } from '@core/utils/getJWT';
import { getCookieOptions } from '@core/utils/getCookieOptions';
import { createValidation } from '../../../middlewares/createValidation';

export const login = async (
  request: Request<never, { login: string; password: string }>,
  response: Response
) => {
  const { login, password } = request.body;
  const user = await PrimaryDB.client.admin.findUnique({ where: { login } });
  if (!user) {
    return response.status(404).end();
  }
  const [hash, salt] = user.hashedPassword.split(':');
  const passwordHash = hashPassword(password, salt);

  if (passwordHash !== hash) {
    return response.status(404).end();
  }

  exclude(user, ['hashedPassword']);
  const token = new JWTService().getAccessToken({ id: user.id });

  response.cookie('userToken', token, getCookieOptions());

  return response.json(makeSuccessResponse(user));
};

const loginRoute = (router: Router) => {
  router.post(
    '/login',
    createValidation({ body: registrationBodySchema }),
    login
  );
};

export { loginRoute };
