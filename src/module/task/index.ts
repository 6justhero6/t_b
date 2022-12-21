import { create } from '@module/task/route/create';
import { getAll } from '@module/task/route/getAll';
import { patch } from '@module/task/route/patch';
import { Router } from 'express';

function task() {
  const router = Router();
  getAll(router);
  create(router);
  patch(router);
  return router;
}

export default task;
