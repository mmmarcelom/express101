# 2ª Etapa

Vamos criar algumas rotas.

## 1º Passo - Adicionar middleware json e forms
````
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
````
Esses middlewares permitem lidar com as requisições recebidas através de forms e json.

## 2º Passo - Adicionar um pseudo banco de dados

Vamos receber os dados em uma variável enquanto não adicionamos um banco de dados
````
const db = {
    'users': [
        { 'nome': 'Marcelo', 'id': 1 },
        { 'nome': 'Tainá', 'id': 2 },
        { 'nome': 'Eduardo', 'id': 3 },
    ]
}
````

## 3º Passo - Rotas dinâmicas

Podemos usar parametros para receber argumentos do front end
Se criarmos uma rota ``users/:id`` e o usuário navegar até http://localhost:3000/users/2 , podemos usar o 2 para retornar o usuário com id = 2. Para isso, basta usar ``req.params`` e o nome do parâmetro.

````
app.get('/users/', (req, res) => {
    res.send(db.users)
})

app.get('/users/:id', (req, res) => {
    let user = db.users.find( user => user.id == req.params.id)
    res.send(user)
})
````

## 4º Passo - Put e Delete

Para usar os demais métodos, vamos precisar do postman ou insomnia.
Vou adicionar as collections.

Vamos alterar um registro usando o put:
````
//app.js

const express = require("express");
const app = express()

const PORT = 3000

app.listen(PORT, (error) =>{ 
    if(error) console.log("Ocorreu um erro: ", error)
    
    console.log(`Servidor iniciado: http://localhost:${PORT}/`)
})
````

## 5º Passo - Modificar o package.json
Nosso arquivo principal é o app.js, então o entry point tem que ser ele:
````
// package.json  

  "main": "app.js",
````

## 6º Passo - Criar uma rota
````
//app.js

app.get('/', (req, res) => {
    res.send('Hello World')
})
````