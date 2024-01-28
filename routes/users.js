// users.js

const router = require("express").Router()
const UserModel = require('../models/UserModel')

router.get('/', (req, res) => {
    UserModel.getAllUsers((error, results) => {
        if (error) return res.status(500).json({ error: 'MySQL connection error' })
        else return res.status(200).json({ results })
    })
})

router.get('/:id', (req, res) => {
    UserModel.getUserById(req.params.id, (error, results) => {
        if (error) return res.status(500).json({ error: 'MySQL connection error' })
        else {
            if(results.length === 0) return res.status(200).json({ message: "Nenhum usuário com esse ID" })
            return res.status(200).json({ results })
        }
    })
})

router.delete('/:id', (req, res) => {
    UserModel.removeUserById(req.params.id, (error, results) => {
        if (error) return res.status(500).json({ error: 'MySQL connection error' })
        return res.status(200).json({ results })
    })
})

router.post('/', (req, res) => {
    const newUserData = { ...req.body }
    
    if (!newUserData.fullname) return res.status(400).send('Faltou nome de usuário')
    if (!newUserData.email) return res.status(400).send('Faltou email')
    if (!newUserData.password) return res.status(400).send('Faltou senha')

    UserModel.createUser(newUserData, (error, results) => {
      if (error) return res.status(500).json({ error: 'MySQL connection error' })
      else return res.status(201).json({ results })
    })
})


/*
router.delete('/:id', (req, res) => {
    const index = db.users.findIndex(user => user.id === parseInt(req.params.id))

    if(index == -1){
        res.send('Não existe usuário com esse ID')
    } else {
        db.users.splice(index, 1)
        res.send(db.users)
    }
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

*/

module.exports = router;