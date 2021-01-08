const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { imageController } = require('../controllers');

router.get('/:pageSize/:page', auth(), imageController.getImages);
router.post('/', auth(), imageController.postImage);
router.get('/:imageId', auth(), imageController.getImage);
router.delete('/:imageId', auth(), imageController.deleteImage);
router.put('/like/:imageId', auth(), imageController.like);
router.put('/unlike/:imageId', auth(), imageController.unlike);

module.exports = router