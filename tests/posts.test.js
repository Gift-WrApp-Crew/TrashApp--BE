const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Post = require('../lib/models/Post');

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('GET /posts gets a list of all posts', async () => {
    const resp = await request(app).get('/api/v1/posts');
    expect(resp.body).toEqual([
      {
        caption: 'is it trash?',
        created_at: '2022-08-31T19:54:30.312Z',
        id: '1',
        image_url: '',
        username: '',
      },
      {
        caption: 'this is another caption',
        created_at: '2022-08-31T19:54:30.312Z',
        id: '2',
        image_url: '',
        username: '',
      },
      {
        caption: 'and another caption',
        created_at: '2022-08-31T19:54:30.312Z',
        id: '3',
        image_url: '',
        username: '',
      },
    ]);
  });

  it.skip('GET /posts/:id should return a specific post', async () => {
    const resp = await request(app).get('/api/v1/posts/2');
    expect(resp.body.caption).toBe('this is another caption');
  });

  it.skip('POST /posts should create a new post', async () => {
    const post = {
      caption: 'it IS trash!',
    };
    const resp = await request(app).post('/api/v1/posts').send(post);
    expect(resp.body.caption).toBe('it IS trash!');
  });

  it.skip('PUT /posts/:id should update a specific post', async () => {
    const resp = await request(app).put('/api/v1/posts/1').send({
      caption: 'my updated caption',
    });
    expect(resp.body.caption).toBe('my updated caption');
  });

  afterAll(() => {
    pool.end();
  });
});
