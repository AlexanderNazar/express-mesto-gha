const router = require('express').Router();

const {
  getUsers, getUserOnId, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserOnId);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
