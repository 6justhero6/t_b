import * as request from 'supertest';
import App from '../src/App';

describe('Service work', () => {
  test('Request the "/" route', async () => {
    const instance = new App();
    const response = await request(instance.app).get('/');
    expect(response).toMatchObject({ statusCode: 404 });
  });
});
