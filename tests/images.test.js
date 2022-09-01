const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
  secure: true,
});

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('POST /image-upload should upload an image to cloudinary', async () => {
    const res = await request(app).post('/image-upload').send({
      image: 'images/cat.jpg',
    });
    console.log('RESSS', res);
    expect(res.body).toBe('');
  });

  afterAll(() => {
    pool.end();
  });
});
