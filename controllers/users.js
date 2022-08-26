const User = require('../models/user');

const {
  BAD_REQUEST_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE, NotFoundError,
} = require('../errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(SERVER_ERROR_CODE).send({
      message: 'Произошла ошибка на стороне сервера',
    }));
};

const getUserOnId = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({
          message: err.message,
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: 'Произошла ошибка на стороне сервера',
        });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: 'Произошла ошибка на стороне сервера',
        });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Попытка внести изменения в данные несуществующего пользователя');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Переданы некорректные данные при попытке изменения данных пользователя',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({
          message: err.message,
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: 'Произошла ошибка на стороне сервера',
        });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Попытка внести изменения в данные несуществующего пользователя');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Переданы некорректные данные при попытке изменения данных пользователя',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({
          message: err.message,
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: 'Произошла ошибка на стороне сервера',
        });
      }
    });
};

module.exports = {
  getUsers, getUserOnId, createUser, updateUser, updateAvatar,
};
