const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function check(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }


  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send('Token is not valid.');
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send('Auth token is not supplied.');
  }
};

module.exports = {
  check,
}