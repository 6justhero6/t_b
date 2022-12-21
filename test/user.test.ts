import * as request from 'supertest';
import App from '../src/App';

export const userIdFromCookie = (cookie: string) => {
  const param = cookie.split('.')[1];
  return JSON.parse(Buffer.from(param, 'base64').toString()).id;
};

export async function createNewUser(instance: App) {

  const res = await request(instance.app)
    .post('/user/')
    .send({
      login: Math.random().toString(),
      password: Math.random().toString(),
    })

  return getResponseUserCookie(res);
}

const getResponseUserCookie = (userResponse) => {
  return (userResponse.header['set-cookie'] as string[]).find(
    (c) => c.includes('userToken')
  );
}
describe('User module', () => {
  const instance = new App();

  test('Registration', async () => {
    const login = Math.random().toString();

    const response = await request(instance.app)
      .post('/user/')
      .send({ login, password: login });

    const cookie = (response.cookies as { name }[]).find(
      (c) => c.name === 'userToken'
    );

    expect(cookie).not.toBeFalsy();
    expect(response.json()).toMatchObject({
      status: 'success',
      data: { login },
    });
  });

  test('Double Registration', async () => {
    const login = Math.random().toString();

    await request(instance.app).post('/user/').send({ login, password: login });

    const response = await request(instance.app)
      .post('/user/')
      .send({ login, password: login });

    expect(response.json()).toMatchObject({
      status: 'error',
      data: { message: 'Login already exists' },
    });
  });

  test('Login', async () => {
    const login = Math.random().toString();

    await request(instance.app).post('/user/').send({ login, password: login });

    const response = await request(instance.app)
      .post('/user/login')
      .send({ login, password: login });

    expect(response.cookies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'userToken',
        }),
      ])
    );

    expect(response.json()).toMatchObject({
      status: 'success',
      data: { login },
    });
  });

  test('Wrong credentials', async () => {
    const response = await request(instance.app)
      .post('/user/')
      .send({ login: 'fewsfderwsf', password: 'login' });
    expect(response.statusCode).toEqual(404);
  });
});
