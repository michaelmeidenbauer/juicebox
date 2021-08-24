const express = require('express');

const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;
  try {
    const taggedPosts = await getPostsByTagName(tagName);

    const posts = taggedPosts.filter((post) => {
      const shouldReturnPost = post.active && req.user && post.author.id === req.user.id;
      return shouldReturnPost;
    });

    res.send({
      posts,
    });
  } catch ({ name, message }) {
    next({ name, message });
    // forward the name and message to the error handler
  }
});

module.exports = tagsRouter;
