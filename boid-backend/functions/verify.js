const jwt = require('jsonwebtoken')
const verifyJwt = require('../helpers/verifyjwt')

module.exports = async ({headers}) => {

  const { Authorization } = headers;
    
  const isJwtValid = verifyJwt(Authorization);
  if (!isJwtValid) return {
    statusCode: 401,
    body: JSON.stringify({ok: false, message: 'Token no válido'})
  }

  const newToken = jwt.sign(
    { id: isJwtValid.id, username: isJwtValid.username },
    process.env.SECRET_JWT,
    { expiresIn: '2h' }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ok: true, message: 'Token actualizado', username: isJwtValid.username, token: newToken})
  }
};