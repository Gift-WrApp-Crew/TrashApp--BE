const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5500', 'http://localhost:7891'],
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
  secure: true,
});

app.get('/api/images', async (req, res) => {
  const { resources } = await cloudinary.search
    .sort_by('public_id', 'desc')
    .max_results(6)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

app.get('/', (request, response) => {
  response.json({ message: 'Hey! This is your server response!' });
});

app.post('/api/v1/image-upload', (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image,
  };

  // upload image here
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: 'success',
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: 'failure',
        error,
      });
    });
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/posts', require('./controllers/posts'));
// app.use('/api/v1/create-post', require('./controllers/create-post'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
module.exports = app;
