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
        'created_at': expect.any(String),
        'id': '1',
        'image_url': '',
        'trash_reaction': '0',
        'treasure_reaction': '0',
        'username': '',
      },
      {
        'caption': 'this is another caption',    
        'created_at': expect.any(String),
        'id': '2',
        'image_url': '',
        'trash_reaction': '0',
        'treasure_reaction': '0',
        'username': '',
      },
      {
        'caption': 'and another caption',    
        'created_at': expect.any(String),
        'id': '3',
        'image_url': '',
        'trash_reaction': '0',
        'treasure_reaction': '0',
        'username': '',
      },
    ]);
  });

  it('GET /posts/:id should return a specific post', async () => {
    const resp = await request(app).get('/api/v1/posts/2');
    expect(resp.body.caption).toBe('this is another caption');
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
      caption: 'my updated caption',
    });
    expect(resp.body.caption).toBe('my updated caption');
  });

  it('DELETE /posts/:id should delete a specific post', async () => {
    const resp = await request(app).delete('/api/v1/posts/1');
    expect(resp.body.id).toBe('1');
  });

  afterAll(() => {
    pool.end();
  });
});
