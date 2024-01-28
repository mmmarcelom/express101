//app.js

const express = require("express");
const app = express()
require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello word')
})

const authRoute = require("./routes/auth.js")
app.use('/auth', authRoute)

const registerRoute = require("./routes/register.js")
app.use('/register', registerRoute)

const { authenticate } = require("./middlewares/auth.js")
app.use(authenticate)

app.use(require('./middlewares/logs.js'))

const usersRoute = require("./routes/users.js")
app.use('/users', usersRoute)

app.listen(PORT, (error) =>{ 
    if(error) console.log("Ocorreu um erro: ", error)
    
    console.log(`Servidor iniciado: http://localhost:${PORT}/`)
})