const Card = require('../models/card');

const {
  BAD_REQUEST_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE, NotFoundError,
} = require('../errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(SERVER_ERROR_CODE).send({
      message: 'Произошла ошибка на стороне сервера',
    }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: 'Произошла ошибка на стороне сервера',
        });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findOneAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Попытка удалить несуществующую карточку');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({
          message: err.message,
        });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Некорректно передан id карточки',
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: 'Произошла ошибка на стороне сервера',
        });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Попытка внести изменения в данные несуществующей карточки');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Передан некорректный id в метод лайка карточки',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({
          message: err.message,
        });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Некорректно передан id карточки',
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: 'Произошла ошибка на стороне сервера',
        });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Попытка внести изменения в данные несуществующей карточки');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Передан некорректный id в метод дизлайка карточки',
        });
      } else if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({
          message: err.message,
        });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({
          message: 'Некорректно передан id карточки',
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({
          message: 'Произошла ошибка на стороне сервера',
        });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
