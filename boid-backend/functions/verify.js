const jwt = require('jsonwebtoken')
const verifyJwt = require('../helpers/verifyjwt')

module.exports = async ({headers}) => {

  const { Authorization } = headers;
  
  if (!Authorization) return {
    statusCode: 401,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ok: false, message: 'Autenticación no válida'})
  }

  const isJwtValid = verifyJwt(Authorization);
  if (!isJwtValid) return {
    statusCode: 401,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ok: false, message: 'Autenticación no válida'})
  }

  const newToken = jwt.sign(
    { id: isJwtValid.id, username: isJwtValid.username },
    process.env.SECRET_JWT,
    { expiresIn: '2h' }
  );

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ok: true, message: 'Token actualizado', username: isJwtValid.username, token: newToken})
  }
};