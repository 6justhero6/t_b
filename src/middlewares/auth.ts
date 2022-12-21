import {NextFunction, Request, Response} from 'express';
import { JWTService } from '@core/utils/getJWT';
import { PrimaryDB } from '@core/db/PrimaryDB';
import { IUser } from '@module/user/interface/IUser';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export async function authorize(request: Request, response: Response, next: NextFunction) {
  const { userToken } = request.signedCookies;

  if (!userToken) {
    return response.status(401).end();
  }

  const payload = new JWTService().decodeAccessToken(userToken);
  if (!payload) {
    return response.status(403).end();
  }
  request.user = await PrimaryDB.client.admin.findUnique({
    where: { id: payload.id },
  });

  if (!request.user) {
    return response.status(404).end();
  }
  next();
}
