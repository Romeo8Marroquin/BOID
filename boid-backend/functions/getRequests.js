const jwt = require('jsonwebtoken')
const verifyJwt = require('../helpers/verifyjwt');
const Conversation = require('../models/Conversation');
const Request = require('../models/Request');

module.exports = async ({headers, queryStringParameters}) => {

  const { Authorization } = headers;
    
  const isJwtValid = verifyJwt(Authorization);
  if (!isJwtValid) return {
    statusCode: 401,
    body: JSON.stringify({ok: false, message: 'Token no válido'})
  }
  
  const { conversation } = queryStringParameters || {};

  if (!conversation) return {
    statusCode: 400,
    body: JSON.stringify({ok: false, message: 'Parámetros no válidos'})
  }

  try {
    
    const requestList = await Request.find({conversation: conversation});

    const newList = requestList.map(({_doc: {_id, conversation, __v, ...element}}) => {
      return {
        id: _id.toString(),
        ...element,
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true, 
        message: 'Request encontradas',
        conversations: newList
      }),
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ok: false, message: 'Error al obtener las conversaciones'})
    }
  }
};