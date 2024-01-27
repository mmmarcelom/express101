//login

const { db, private_key } = require('../contants')
const jwt = require('jsonwebtoken')

const checkCredentials = (req, res, next) => {

    const userLogin = req.headers.login
    const userPassword = req.headers.password
    
    const user = db.users.find(user => user.login === userLogin)
    
    if(!user) return res.status(401).send('Usuário não existe')
    if(!checkPassword(user, userPassword)) return res.status(401).send('Senha incorreta') 

    req.user = user
        
    next()
}

function checkPassword(user, userPassword){
    return user.password === userPassword
}

const getToken = (req, res) => {
    
    const accessToken = jwt.sign({ id: req.user.id }, private_key, { expiresIn: '1h' })

    res
    .cookie("access_token", accessToken, { httpOnly: true, secure: false })
    .status(200)
    .json({ message: "Logado com sucesso" });

    console.log('Authenticated:', req.user)
}

const eraseToken = (req, res) => {
    res.clearCookie("access_token").status(200).json({ message: "Logout realizado" });
}

module.exports = { checkCredentials, getToken, eraseToken }