const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.js');
const {
  User,
} = require('../models/model');

module.exports = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      next();
      return;
    }
    const decrypt = await jwt.verify(token, secret);
    req.user = await User.findOne({
      where: {
        id: decrypt.user.id,
      },
    });
    next();
  } catch (err) {
    console.error(err);
    next();
  }
};
