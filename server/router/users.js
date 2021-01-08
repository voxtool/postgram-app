const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/profile', auth(), authController.getProfileInfo);
router.get('/users', auth(), authController.getAllUsers);
router.get('/:userId', auth(), authController.getUserById);
router.put('/follow/:user', auth(), authController.follow);
router.put('/unfollow/:user', auth(), authController.unFollow);

module.exports = router