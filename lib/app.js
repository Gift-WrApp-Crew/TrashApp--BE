const express = require('express');
const posts = require('./controller/posts');
const cors = require('cors');
const cloudinary = require('cloudinary');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5500', 'http://localhost:7890'],
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
  secure: true,
});

app.use('/api/v1/posts', posts);
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
