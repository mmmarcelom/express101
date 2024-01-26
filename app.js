//app.js

const express = require("express");
const app = express()

const PORT = 3000

const db = {
    'users': [
        { 'nome': 'Marcelo', 'id': 1 },
        { 'nome': 'Tainá', 'id': 2 },
        { 'nome': 'Eduardo', 'id': 3 },
    ]
}

app.get('/', (req, res) => {
    res.send('Hello word')
})

app.get('/users/', (req, res) => {
    res.send(db.users)
})

app.get('/users/:id', (req, res) => {
    let user = db.users.find( user => user.id == req.params.id)
    res.send(user)
})

app.delete('/users/:id', (req, res) => {
    let index = db.users.indexOf({id: req.params.id})
    db.users.pop(index)
    res.send(users)
})

app.listen(PORT, (error) =>{ 
    if(error) console.log("Ocorreu um erro: ", error)
    
    console.log(`Servidor iniciado: http://localhost:${PORT}/`)
})