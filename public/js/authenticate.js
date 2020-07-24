const jwt = require('jsonwebtoken');
const {secret} = require('../../config/config.js')

module.exports = async (req, res) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return null;
    }
    const decrypt = await jwt.verify(token, secret);
    const user = await User.findOne({
      where: {
          id: decrypt.user.id
      }
    });
    req.user = user;
    return req.user;
  } catch (err) {
    return null;
  }
};