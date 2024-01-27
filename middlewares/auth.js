// middlewares/auth.js

const jwt = require('jsonwebtoken')
const { private_key } = require('../contants')

const authenticate = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    console.log(accessToken)
    if(!accessToken) res.sendStatus(403);
   
    try {
      jwt.verify(accessToken, private_key);
      next();
    } catch (error) {
      res.sendStatus(403);
    }
  }

module.exports = { authenticate }