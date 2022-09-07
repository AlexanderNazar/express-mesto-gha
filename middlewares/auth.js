const jwt = require('jsonwebtoken');

const UnautorizedError = require('../Errors/UnautorizedError');

module.exports = (req, res, next) => {
  const { jwtForAutorization } = req.cookies;

  if (!jwtForAutorization) {
    throw new UnautorizedError('Необходима авторизация');
  }

  const token = jwtForAutorization;
  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
