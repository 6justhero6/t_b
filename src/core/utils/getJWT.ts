import * as jwt from 'jsonwebtoken';
import { EnvVars, safeGetEnvVar } from '../../config';

export interface AccessTokenPayload {
  id: number;
}

export class JWTService {
  private readonly secret: string;
  constructor() {
    this.secret = safeGetEnvVar(EnvVars.JWT_SECRET);
  }

  public getAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, this.secret);
  }

  public decodeAccessToken(token: string): AccessTokenPayload {
    try {
      return jwt.verify(token, this.secret) as AccessTokenPayload;
    } catch (error) {
      return null;
    }
  }
}
