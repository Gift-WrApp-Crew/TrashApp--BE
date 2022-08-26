const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Post = require('../lib/models/Post');

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /posts gets a list of all posts', async () => {
    const resp = await request(app).get('/api/v1/posts');
    expect(resp.body).toEqual([{ id: '1', caption: 'is it trash?' }]);
  });
  afterAll(() => {
    pool.end();
  });
});
