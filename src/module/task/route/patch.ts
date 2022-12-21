import * as Yup from 'yup';
import { Request, Router } from 'express';

import { PrimaryDB } from '@core/db/PrimaryDB';
import { makeSuccessResponse } from '@core/utils/makeSuccessResponse';
import { createValidation } from '../../../middlewares/createValidation';
import { authorize } from '../../../middlewares/auth';

export const patchHandler = async (request: Request<{ taskId: string }, { text?: string, done: boolean }>, response) => {
  let data: { text?: string, done?: boolean, edited?: boolean } = {};
  if (request.body.text) {
    data.text = request.body.text;
    data.edited = true;
  }

  if (request.body.done) {
    data.done = request.body.done;
  }

  const updatedTask = await PrimaryDB.client.task.update({
    where: { id: parseInt(request.params.taskId) },
    data: { ...data },
  });
  return response.json(makeSuccessResponse(updatedTask));
};

const patch = (router: Router) => {
  const validation = createValidation({
    body: Yup.object().shape({
      userName: Yup.string().optional(),
      email: Yup.string().email().optional(),
      text: Yup.string().optional(),
      done: Yup.boolean().optional(),
    }),
    params: Yup.object().shape({
      taskId: Yup.number().transform(value => parseInt(value)).required(),
    }),
  });

  router.patch('/:taskId', authorize, validation, patchHandler);
};

export { patch };
