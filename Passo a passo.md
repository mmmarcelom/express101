# 3ª Etapa

Vamos adicionar o router.

## 1º Passo - Rotas

### Criar arquivo routes.js

Vamos criar um arquivo de rotas para os usuários.
No arquivo de rotas, vamos adicionar o router:

````
// routes.js

const express = require("express");
const router = express.Router();
const db = require('../contants')

router.get('/', (req, res) => {
    res.send(db.users)
})

module.exports = router;

````
E no arquivo app.js, vamos adicionar 

````
const usersRoute = require("./routes.js")
app.use('/users', usersRoute)

````

Agora que estamos usando vários arquivos, o pseudo banco não estará disponível nas outras rotas.
Vamos criar um arquivo de constantes e mover nossa constante para lá.
(Na próxima etapa vamos usar um json ao invés de uma constante)

````
// constants.js

const db = {
    'users': [
        { 'nome': 'Marcelo', 'id': 1 },
        { 'nome': 'Tainá', 'id': 2 },
        { 'nome': 'Eduardo', 'id': 3 },
    ]
}

const private_key = 'abc123' // <= Já explico o que é isso

module.exports = { db, private_key }

````

Dessa forma, qualquer chamado para localhost:3000/users, vai utilizar as rotas.

### Mover suas rotas para o arquivo de rotas

Podemos mover todas as rotas de usuários para a rota do users.
Também podemos adicionar vários arquivos de rotas, cada um com um serviço diferente.
Ex.: users, products, lawsuits e etc..

Para organizar isso tudo, é interessante colocar todas as rotas em uma única pasta chamada routes.
Não se esqueça de atualizar as referencias.

## 2º Passo - Segurança

### Login e senha

Para garantir a segurança, precisamos implantar o básico de segurança.

Para a rota de login, enviaremos um usuário e senha e receberemos um access_token.
Para as demais rotas, enviaremos o access_token.

Vamos deixar a rota lawfirms sem qualquer segurança, visto que a ideia é ela ser pública.

Para facilitar a organização, vamos criar uma pasta para os middlewares.

Note que eu adicionei username e senha na constant de usuários.

````
// middlewares/login.js

const { db, private_key } = require('../contants')

const checkCredentials = (req, res, next) => {

    const userLogin = req.headers.login
    const userPassword = req.headers.password
    
    const user = db.users.find(user => user.login === userLogin)
    console.log(db.users)
    
    if(!user) return res.status(401).send('Usuário não existe')
    if(!checkPassword(user, userPassword)) return res.status(401).send('Senha incorreta') 

    req.user = user
        
    next()
}

function checkPassword(user, userPassword){
    return user.password === userPassword
}
````

Vamos adicionar a rota

````
const { authenticate } = require('./middlewares/auth.js')

const authRoute = require("./routes/auth.js")
app.use('/auth', authRoute)

````

Na nossa rota, vamos adicionar a função:
````
// auth.js

const express = require("express");
const router = express.Router();
const { checkCredentials, getToken, eraseToken } = require('../middlewares/login.js')

router.get('/login', checkCredentials, getToken)

router.get('/logout', eraseToken)

module.exports = router;

````

### JWT

O access_token é uma chave que passamos para o usuário que fez login com sucesso.  
Com essa chave ele acessa todas as outras rotas.  
Instale o jwt no terminal: ``npm install jsonwebtoken``

Criaremos um arquivo na pasta middlewares:
````
// middlewares/auth.js

const jwt = require('jsonwebtoken')
const { private_key } = require('../contants')

const authenticate = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if(!accessToken) res.sendStatus(403);
   
    try {
      jwt.verify(accessToken, private_key);
      next();
    } catch (error) {
      res.sendStatus(403);
    }
  }

module.exports = { authenticate }

````

Como vamos adicionar o access_token nos cookies, também precisamos usar ``npm install cookie-parser``

Adicionamos o cookieParser e nosso authenticate como middlewares

````
//app.js

const cookieParser = require('cookie-parser');
app.use(cookieParser());


const { authenticate } = require("./middlewares/auth.js")
app.use(authenticate)

````

Estamos usando um arquivo de constantes para armazenar nosso banco de dados e segredo dos nossos tokens.  
Na próxima etapa vamos: 
1. adicionar variáveis de ambiente
2. conectar com um banco de verdade
3. adicionar criptografia nas senhas