# 4ª Etapa

## 1º Passo - Variáveis de ambiente

``npm install dotenv``

````
// app.js
require('dotenv').config();
````

.env
````
MYSQL_HOST=xxxxxx
MYSQL_USER=xxxxxxx
MYSQL_PASSWORD=xxxxxxx
MYSQL_DB=xxxxxxx
MYSQL_PORT=xxxxxx

PRIVATE_KEY=xxxxxx
EXPIRES_IN=1h
````
Ao fazer isso, já podemos substituir:  
``const accessToken = jwt.sign({ id: req.user.id }, private_key, { expiresIn: '1h' })``  
Por:  
``const accessToken = jwt.sign({ id: req.user.id }, process.env.PRIVATE_KEY, { expiresIn: '1h' })`` 

## 2º Passo - MySQL

``npm install mysql``

````
//connection.js

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
})

module.exports = connection
````
Para facilitar a gestão dos funções de banco de dados, vamos criar a pasta models e o arquivo UserModel

````
// models/userModel.js

const connection = require('../connection');

function createUser(user, callback) {
  const { username, email, password } = user;
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
  connection.query(query, [username, email, password], (error, results) => {
    if (error) callback(error, null)
    else callback(null, results.insertId)
  })
  connection.end()
}

function getAllUsers(callback) {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) callback(error, null)
    else callback(null, results)
  })
  connection.end()
}

module.exports = { createUser, getAllUsers };

````
A partir de agora, será interessante usar o DBeaver ou outro gestor de banco de dados.  
Para criar o mesmo banco de dados do nosso arquivo de constantes, segue o código em SQL:

````
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password)
VALUES
    ('Marcelo', 'marcelo@gmail.com', 'abc'),
    ('Tainá', 'taina@gmail.com', '123'),
    ('Eduardo', 'eduardo@gmail.com', 'qwerty');

SELECT * from users

````

## 3º Passo - HASH e SALT