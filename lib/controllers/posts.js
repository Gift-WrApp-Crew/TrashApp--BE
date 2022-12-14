const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  })

  .get('/favorites', authenticate, async (req, res, next) => {
    try {
      const favPosts = await Post.getFavorites(req.user.id);
      res.json(favPosts);
    } catch (error) {
      next(error);
    }
  })

  .post('/favorites', authenticate, async (req, res, next) => {
    try {
      const { id } = req.body;
      const newPost = await Post.createFavorite(req.user.id, id);
      res.json(newPost);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const singlePost = await Post.getById(req.params.id);
      res.json(singlePost);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const newPost = await Post.insert(req.body);
      res.json(newPost);
    } catch (error) {
      next(error);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const post = await Post.updateById(req.params.id, req.body);
      res.json(post);
    } catch (error) {
      next(error);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const postToDelete = await Post.deleteById(req.params.id);
      res.json(postToDelete);
    } catch (error) {
      next (error);
    }
  });
