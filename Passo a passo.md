# 1ª Etapa

## 1º Criar o repositório (seja pelo github ou git init)

## 2º Passo - Iniciar o projeto
````
npm init -y
````
Esse comando cria uma package.json com as especificações do projeto.  
A flag -y é "Yes to all"

## 3º Passo - app.js
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

## 4º Passo - Modificar o package.json
Nosso arquivo principal é o app.js, então o entry point tem que ser ele:
````
// package.json  

  "main": "app.js",
````

## 5º Passo - Criar uma rota
````
//app.js

app.get('/', (req, res) => {
    res.send('Hello World')
})
````
Agora você já pode rodar ``node app.js`` e acessar http://localhost:3000/ para ver ser servidor rodando.

## 6º Passo - Instalar o nodemon

Essa parte é opcional, mas ajuda muito.
Sempre que você alterar algo, você terá que reiniciar o servidor para testar.
Com o nodemon, você não precisará disso.

No terminal:
````
npm install --save-dev nodemo
````
A flag --save-dev instala o pacote como dev-dependency

Ao invés de usar ``node app.js``, podemos usar ``nodemon app.j``.  

Mas dá para fazer ainda melhor, podemos criar um script no package.json

No package.json:
````
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js"
  },
````
Dessa forma, para iniciar o server em modo de desenvolvimento, basta rodar ``npm run dev``.