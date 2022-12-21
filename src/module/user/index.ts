import { registrationRoute } from '@module/user/route/registration';
import { loginRoute } from '@module/user/route/login';
import { logoutRoute } from '@module/user/route/logout';
import { Router } from 'express';

function user() {
  const router = Router();
  registrationRoute(router);
  loginRoute(router);
  logoutRoute(router);
  return router;
}

export default user;
