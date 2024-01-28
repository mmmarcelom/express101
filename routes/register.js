const router = require("express").Router()
const UserModel = require('../models/UserModel')

router.post('/', async (req, res) => {
    const newUserData = { ...req.body }
    
    if (!newUserData.fullname) return res.status(400).send('Faltou nome de usuário')
    if (!newUserData.email) return res.status(400).send('Faltou email')
    if (!newUserData.password) return res.status(400).send('Faltou senha')

    try {
        let userId = await UserModel.register(newUserData)
        return res.status(201).json({ userId })
    } catch(e){
        return res.status(500).json({ error: e.message })
    }
})

module.exports = router;