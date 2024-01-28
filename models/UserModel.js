// models/userModel.js

const connection = require('../connection');

function register(user) {
  const { fullname, email, password } = user
  const query = `
    INSERT INTO users 
      (fullname, email, password) 
    VALUES 
    ('${fullname}', '${email}', '${password}')
  `
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) return reject(error)
      return resolve(results.insertId)
    })
  })
}

function createUser(user, callback) {
  const { fullname, email, password } = user;
  const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)'
  connection.query(query, [fullname, email, password], (error, results) => {
    if (error) callback(error, null)
    else callback(null, results.insertId)
  })
}



function getAllUsers(callback) {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) callback(error, null)
    else callback(null, results)
  })
}

function getUserById(id, callback){
  try {
    const query = `SELECT * FROM users WHERE id=${id}`
    connection.query(query, (error, results) => {
      if(error) callback(error, null)
      console.log(results)
      if(results.length === 0) callback(null, 'Nenhum usuário com esse id')
      callback(null, results)
    })
  } catch(e) {
    callback(null, 'Ocorreu um erro no getUserById: ' + e.message)
  }
}

function getUserByEmail(email, callback){
  try {
    const query = `SELECT * FROM users WHERE email='${email}'`
    connection.query(query, (error, results) => {
      if(error) return callback(error, null)
      if(results.length === 0) callback(null, 'Nenhum usuário com esse nome de usuário')
      callback(null, { ... results[0] })
    })
  } catch(e) {
    callback(null, 'Ocorreu um erro no getUserByEmail: ' + e.message)
  } 
}

function removeUserById(id, callback){

  try {
    const selectQuery = `SELECT id FROM users WHERE id=${id}`
    connection.query(selectQuery, (error, results) => {
      if(error) callback(error, null)
      console.log(results)
      if(results.length === 0) callback(null, 'Nenhum usuário com esse id')
    })

    const deleteQuery = `DELETE FROM users WHERE id=${id}`
    connection.query(deleteQuery, (error, results) => {
      if (error) callback(error, null)
      callback(null, 'Deletado com sucesso')
    })
  
  } catch(e) {
    callback(null, 'Ocorreu um erro no removeUserById: ' + e.message)
  }
}

module.exports = { 
  register,
  createUser, 
  getAllUsers, 
  getUserById, 
  getUserByEmail, 
  removeUserById 
};