// users.js

const express = require("express");
const router = express.Router();
const { db } = require('../contants')

router.get('/', (req, res) => {
    res.status(200).send(db.users)
})

router.get('/:id', (req, res) => {
    let user = db.users.find( user => user.id == req.params.id)
    res.send(user)
})

router.delete('/:id', (req, res) => {
    const index = db.users.findIndex(user => user.id === parseInt(req.params.id))

    if(index == -1){
        res.send('Não existe usuário com esse ID')
    } else {
        db.users.splice(index, 1)
        res.send(db.users)
    }
})

router.post('/', (req, res) => {
    const newUserData = { ...req.body }
    
    if (!newUserData.nome) return res.status(400).send('Faltou o nome: nome')

    const newUser = { "id": db.users.length + 1, "nome": newUserData.nome }

    db.users.push(newUser)
    res.status(201).json(newUser)
})

router.put('/:id', (req, res) => {
    
    if(!req.body) return res.status(400).send('Favor enviar os dados')
    const newUserdata = { ...req.body }

    const id = parseInt(req.params.id)
    const userIndex = db.users.findIndex(user => user.id === id)
    
    if(userIndex == -1) return res.status(404).send('Usuário não encontrado')

    db.users[userIndex]= newUserdata
    res.status(200).json(db.users)
})

module.exports = router;