const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = async ({body}) => {

    const { username, password } = JSON.parse(body);
  
    if (!username || !password) return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ok: false, message: 'Los parámetros no son válidos'})
    }
  
    try {
      let users;
      if (username.split('@').length > 1) {
        users = await User.find({email: username});
      } else {
        users = await User.find({username});
      }
  
      if (users.length === 0) return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: false, message: 'Error en el inicio de sesión'})
      }
  
      const { _id, username: usernameRegistry, email: emailRegistry, password: hashed } = users[0];
      const verify = bcrypt.compareSync(password, hashed);
  
      if (!verify) return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: false, message: 'Error en el inicio de sesión'})
      }

      const token = jwt.sign(
        {
          id: _id,
          username: usernameRegistry
        },
        process.env.SECRET_JWT,
        {
          expiresIn: '2h'
        }
      )
  
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: true, message: 'Inicio de sesión correcto', username: usernameRegistry, token})
      }
      
    } catch (error) {
      console.log(error);
    }
};