const express = require('express');

const postsRouter = express.Router();
const { getAllPosts } = require('../db');
const { requireUser } = require('./utils');

postsRouter.get('/', async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
});

postsRouter.post('/', requireUser, async (req, res, next) => {
  res.send({ message: 'under construction' });
});

module.exports = postsRouter;
