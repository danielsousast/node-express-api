const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { secret } = require('../../config/jwt');

module.exports =  async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ error: 'Token não provido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};