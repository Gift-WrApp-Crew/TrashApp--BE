const { Router } = require('express');
const Reaction = require('../models/Reaction');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const reactions = await Reaction.getAll();
      res.json(reactions);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const newReaction = await Reaction.insert({ ...req.body });
      res.json(newReaction);
    } catch (error) {
      next(error);
    }
  });
