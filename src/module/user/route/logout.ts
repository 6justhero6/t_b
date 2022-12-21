import { Request, Response, Router } from 'express';

import { makeSuccessResponse } from '@core/utils/makeSuccessResponse';

export const logout = async (
  request: Request,
  response: Response
) => {
  response.clearCookie('userToken');
  return response.json(makeSuccessResponse());
};

const logoutRoute = (router: Router) => {
  router.post(
    '/logout',
    logout,
  );
};

export { logoutRoute };
