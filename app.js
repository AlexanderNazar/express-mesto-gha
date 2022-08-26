const express = require('express');

const mongoose = require('mongoose');

const app = express();

const userRouter = require('./routes/users');

const cardRouter = require('./routes/cards');

const { NOT_FOUND_CODE } = require('./errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '63061215e8d49824283ea432',
  };

  next();
});
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({
    message: 'Страница не найдена',
  });
});

app.listen(PORT);
