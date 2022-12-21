import UserModule from './user';
import TaskModule from './task';
import { Express } from 'express';

export const enableModules = (app: Express) => {
  app.use('/user', UserModule());
  app.use('/task', TaskModule());
};
