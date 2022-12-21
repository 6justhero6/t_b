import * as Yup from 'yup';

import { PrimaryDB } from '@core/db/PrimaryDB';
import { makeSuccessResponse } from '@core/utils/makeSuccessResponse';
import { Request, Router } from 'express';
import { createValidation } from '../../../middlewares/createValidation';

const sorts = ['email_asc', 'text_asc', 'userName_asc', 'id_asc', 'email_desc', 'text_desc', 'userName_desc', 'id_desc',  'done_asc', 'done_desc'];

export const getAllHandler = async (
  request: Request<
    {
      page: number;
      sort: string;
      count: number;
    }
  >,
  response,
) => {
  const { page, sort, count } = request.params;
  const [sortName, order] = sort.split('_');
  const tasks = await PrimaryDB.client.task.findMany({
    skip: page * count,
    take: count,
    orderBy: { [sortName]: order },
  });
  const taskCount = await PrimaryDB.client.task.count();
  return response.json(makeSuccessResponse({ tasks, count: taskCount }));
};

const getAll = (router: Router) => {
  const bodySchema = Yup.object()
    .shape({
      page: Yup.number().required(),
      count: Yup.number().required(),
      sort: Yup.string()
        .oneOf(sorts)
        .default('id'),
    })
    .required();

  router.get('/:page/:count/:sort?', createValidation({ params: bodySchema }), getAllHandler);
};

export { getAll };
