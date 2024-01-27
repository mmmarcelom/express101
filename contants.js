// constants.js

const db = {
    'users': [
        { 
            'nome': 'Marcelo', 
            'id': 1, 
            'login': 'marcelo@gmail.com',
            'password': 'abc'
        },
        { 
            'nome': 'Tainá',
            'id': 2,
            'login': 'taina@gmail.com',
            'password': '123'
        },
        { 
            'nome': 
            'Eduardo', 
            'id': 3,
            'login': 'eduardo@gmail.com',
            'password': 'qwerty'
        },
    ]
}

const private_key = 'abc123'

module.exports = { db, private_key }