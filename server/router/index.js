const express = require('express');
const router = express.Router();
const users = require('./users');
const images = require('./images');
const comments = require('./comments');

router.use('/users', users);
router.use('/images', images);
router.use('/comments', comments);

module.exports = router;