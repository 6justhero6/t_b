import { Express, json } from 'express';
import * as cookieParser from 'cookie-parser';
import { EnvVars, safeGetEnvVar } from '../config';

export function enablePlugins(app: Express) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', ['POST', 'GET', 'PATCH', 'OPTIONS']);
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
  })
  app.use(cookieParser(safeGetEnvVar(EnvVars.COOKIE_SECRET)));
  app.use(json());
}
