const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

router.post('/:imageId', auth(), commentController.createComment);
router.delete('/:imageId/:commentId', auth(), commentController.deleteComment);

module.exports = router