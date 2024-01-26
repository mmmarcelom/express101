# 2ª Etapa

Vamos criar algumas rotas.

## 1º Passo - Adicionar um pseudo banco de dados

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

## 2º Passo - Rotas dinâmicas

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

## 3º Passo - Remover um usuário com DELETE

Para usar os demais métodos, vamos precisar do postman ou insomnia.
Vou adicionar as collections.

Vamos remover um registro usando o delete:
````
//app.js

app.delete('/users/:id', (req, res) => {
    const index = db.users.findIndex(user => user.id === parseInt(req.params.id))

    if(index == -1){
        res.send('Não existe usuário com esse ID')
    } else {
        db.users.splice(index, 1)
        res.send(db.users)
    }
})
````

## 4º Passo - Adicionar middleware json e forms

Para usar o post e put, vamos precisar pegar as informações do body da requisição. Para isso vamos precisar desses middlewares abaixo:
````
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
````
Esses middlewares permitem lidar com as requisições recebidas através de forms e json.

## 5º Passo - Adicionar um usuário com o POST
Nosso arquivo principal é o app.js, então o entry point tem que ser ele:

````
app.post('/users', (req, res) => {
    const newUserData = { ...req.body }
    
    if (!newUserData.nome) return res.status(400).send('Faltou o nome: nome')

    const newUser = { "id": db.users.length + 1, "nome": newUserData.nome }

    db.users.push(newUser)
    res.status(201).json(newUser)
})
````
Percebe que eu comecei a mandar status diferentes?  
400 é uma bad request (faltou o nome)
201 é criado

Se você gosta de gatos, acesse: https://http.cat/
Se voce prefere cachorros, acesse: https://http.dog/

## 6º Passo - Alterar um usuário com PUT

````
app.put('/users/:id', (req, res) => {
    
    if(!req.body) return res.status(400).send('Favor enviar os dados')
    const newUserdata = { ...req.body }

    const id = parseInt(req.params.id)
    const userIndex = db.users.findIndex(user => user.id === id)
    
    if(userIndex == -1) return res.status(404).send('Usuário não encontrado')

    db.users[userIndex].push(newUserdata)
    res.status(200).json(db.users)
})
````

Por enquanto é só... não sei se vc percebeu, mas o arquivo já está ficando grande, próxima etapa vamos criar rotas