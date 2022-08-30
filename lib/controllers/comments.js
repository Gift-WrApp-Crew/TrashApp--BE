const { Router } = require('express');
const Comment = require('../models/Comment');

module.exports = Router()
  .get('comments/:id', async (req, res, next) => {
    try {
      const comments = await Comment.getAllCommentsByPostId(req.params.id);
      res.json(comments);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const newComment = await Comment.createComment(req.body);
      res.json(newComment);
    } catch (e) {
      next(e);
    }
  });
