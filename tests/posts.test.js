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
    expect(resp.body).toEqual([
      {
        'caption': 'is it trash?',
        'id': '1',
      },
      {
        'caption': 'this is another caption',
        'id': '2',
      },
      {
        'caption': 'and another caption',
        'id': '3',
      },
    ]);
  });


  it('POST /posts should create a new post', async () => {
    const post = {
      caption: 'it IS trash!',
    };
    const resp = await request(app).post('/api/v1/posts').send(post);
    expect(resp.body.caption).toBe('it IS trash!');
  });

  it('PUT /posts/:id should update a specific post', async () => {
    const resp = await request(app).put('/api/v1/posts/1').send({
      caption: 'my updated caption'
    });
    expect(resp.body.caption).toBe('my updated caption');
  });

  afterAll(() => {
    pool.end();
  });
});
