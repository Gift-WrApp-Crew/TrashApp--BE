const express = require('express');
const posts = require('./controller/posts');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5500', 'http://localhost:7891'],
    credentials: true,
  })
);

app.use('/api/v1/posts', posts);
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
