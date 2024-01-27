// auth.js

const express = require("express");
const router = express.Router();
const { checkCredentials, getToken, eraseToken } = require('../middlewares/login.js')

router.get('/login', checkCredentials, getToken)

router.get('/logout', eraseToken)

module.exports = router;