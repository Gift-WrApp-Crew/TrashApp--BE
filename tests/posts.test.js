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
  it('POST /posts should create a new post', async () => {
    const post = {
      caption: 'it IS trash!',
    };
    const resp = await request(app).post('/api/v1/posts').send(post);
    expect(resp.body.caption).toBe('it IS trash!');
  });

  afterAll(() => {
    pool.end();
  });
});
