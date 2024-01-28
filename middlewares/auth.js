// middlewares/auth.js

const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const accessToken = req.cookies.access_token;

    if(!accessToken) res.sendStatus(403);
   
    try {
      jwt.verify(accessToken, process.env.PRIVATE_KEY);
      next();
    } catch (error) {
      res.sendStatus(403);
    }
  }

module.exports = { authenticate }