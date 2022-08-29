const { Router } = require('express');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const singlePost = await Post.getById(req.params.id);
      res.json(singlePost);
    } catch (error) {
      next (error);
    }
  })
  
  .post('/', async (req, res, next) => {
    try {
      const newPost = await Post.insert({ ...req.body });
      res.json(newPost);
    } catch (error) {
      next(error);
    }
  });
