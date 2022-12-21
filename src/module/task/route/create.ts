import * as Yup from 'yup';

import { PrimaryDB } from '@core/db/PrimaryDB';
import { makeSuccessResponse } from '@core/utils/makeSuccessResponse';
import { ITask } from '@module/task/interface/ITask';
import { Request, Router } from 'express';
import { createValidation } from '../../../middlewares/createValidation';

export const createHandler = async (
  request: Request<
    never,
    {
      Body: Omit<ITask, 'id'>;
    }
  >,
  response,
) => {
  const body = request.body;
  const task = await PrimaryDB.client.task.create({
    data: body,
  });
  return response.json(makeSuccessResponse(task));
};

const create = (router: Router) => {
  const bodySchema = Yup.object()
    .shape({
      email: Yup.string().email().required(),
      userName: Yup.string().required(),
      text: Yup.string().required(),
    })
    .required();

  router.post('/', createValidation({ body: bodySchema }), createHandler);
};

export { create };
