//app.js

const express = require("express");
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

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
    const index = db.users.findIndex(user => user.id === parseInt(req.params.id))

    if(index == -1){
        res.send('Não existe usuário com esse ID')
    } else {
        db.users.splice(index, 1)
        res.send(db.users)
    }
})

app.post('/users', (req, res) => {
    const newUserData = { ...req.body }
    
    if (!newUserData.nome) return res.status(400).send('Faltou o nome: nome')

    const newUser = { "id": db.users.length + 1, "nome": newUserData.nome }

    db.users.push(newUser)
    res.status(201).json(newUser)
})

app.put('/users/:id', (req, res) => {
    
    if(!req.body) return res.status(400).send('Favor enviar os dados')
    const newUserdata = { ...req.body }

    const id = parseInt(req.params.id)
    const userIndex = db.users.findIndex(user => user.id === id)
    
    if(userIndex == -1) return res.status(404).send('Usuário não encontrado')

    db.users[userIndex]= newUserdata
    res.status(200).json(db.users)
})

app.listen(PORT, (error) =>{ 
    if(error) console.log("Ocorreu um erro: ", error)
    
    console.log(`Servidor iniciado: http://localhost:${PORT}/`)
})