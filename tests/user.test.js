const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  email: 'test@mock.com',
  password: '1234567',
  username: 'mockUser',
};

const signUpAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email, username } = user;
  await agent.post('/api/v1/users/sessions').send({
    email,
    password,
    username,
  });
  return [agent, user];
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('new user created upon sign up', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email, username } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
      username,
      message: 'Successfully signed up',
    });
  });

  it.skip('logs in a created user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email, username } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
      username,
      message: 'Successfully signed up',
    });
    const res1 = await request(app)
      .post('/api/v1/users/sessions')
      .send(mockUser);
    expect(res1.status).toEqual(200);
    expect(res1.body.message).toEqual('Successfully signed in');
  });

  it.skip('returns the current user', async () => {
    const [agent, user] = await signUpAndLogin();
    const me = await agent.get('/api/v1/users/me');

    expect(me.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });
  it.skip('DELETE /sessions deletes the user session', async () => {
    const [agent] = await signUpAndLogin();
    const resp = await agent.delete('/api/v1/users/sessions');
    expect(resp.status).toBe(204);
  });
  afterAll(() => {
    pool.end();
  });
});
