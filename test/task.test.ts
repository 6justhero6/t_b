import * as request from 'supertest';
import App from '../src/App';
import { PrimaryDB } from '@core/db/PrimaryDB';
import { ITask } from '@module/task/interface/ITask';
import { IResponse } from '@core/interface/IResponse';
import { createNewUser } from './user.test';

export const createTask = (instance: App, task?: Omit<ITask, 'id' | 'done'>) =>
  request(instance.app)
    .post('/task/')
    .send(
      task || {
        email: 'alfar2@mail.ru',
        userName: 'Alfar',
        text: 'Task content',
      }
    );

describe('Task', () => {
  const instance = new App();

  test('Create', async () => {
    const taskResult = await createTask(instance);
    expect(taskResult.body).toMatchObject({
      status: 'success',
      data: {
        email: 'alfar2@mail.ru',
        userName: 'Alfar',
        text: 'Task content',
      },
    });
  });

  test('Get all', async () => {
    await PrimaryDB.client.task.deleteMany({});

    await createTask(instance);
    await createTask(instance);
    await createTask(instance);

    const getAllRes = await request(instance.app)
      .get('/task/0/200')
      .send();

    const data = getAllRes.body as IResponse<ITask[]>;
    expect(data).toMatchObject({ status: 'success' });
    expect(data.data.length).toEqual(3);
  });

  test('Patch task unauthorized', async () => {
    const taskId = (await createTask(instance)).body.data.id;

    const patchRes = await request(instance.app)
      .patch(`/task/${taskId}`)
      .send({ text: 'New Text' });

    expect(patchRes.statusCode).toEqual(401);
  });

  test('Patch task admin', async () => {
    const userCookie = await createNewUser(instance);

    const taskId = (await createTask(instance)).body.data.id;

    const patchRes = await request(instance.app)
      .patch(`/task/${taskId}`)
      .set('Cookie', `${userCookie}`)
      .send({ text: 'New Text' });
    const data = patchRes.body;

    expect(data).toMatchObject({ status: 'success' });
    expect(data.data).toMatchObject({ text: 'New Text' });
  });

  test('Task order', async () => {
    await PrimaryDB.client.task.deleteMany({});

    await createTask(instance, {
      email: 'alfar2@mail.ru',
      userName: 'Alfar3',
      text: 'Task content',
    });

    await createTask(instance, {
      email: 'alfar2@mail.ru',
      userName: 'Alfar2',
      text: 'Task content',
    });

    await createTask(instance, {
      email: 'alfar2@mail.ru',
      userName: 'Alfar1',
      text: 'Task content',
    });

    const getAllRes = await request(instance.app)
      .get('/task/0/10/userName')
      .send();

    const data = getAllRes.body as IResponse<ITask[]>;
    expect(data).toMatchObject({ status: 'success' });
    expect(data.data.length).toEqual(3);
    expect(data.data).toMatchObject([
      { userName: 'Alfar1' },
      { userName: 'Alfar2' },
      { userName: 'Alfar3' },
    ]);
  });
});
