# 1ª Etapa

## 1º Criar o repositório (seja pelo github ou git init)

## 2º Passo - Iniciar o projeto
````
npm init -y
````
Esse comando cria uma package.json com as especificações do projeto.  
A flag -y é "Yes to all"

## 3º Passo - Instalar o nodemon
````
npm install --save-dev nodemo
````
A flag --save-dev instala o pacote como dev-dependency

## 4º Passo - app.js
Criar um arquivo js e iniciar com o boilerplate do express:
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