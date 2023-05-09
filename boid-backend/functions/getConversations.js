const jwt = require('jsonwebtoken')
const verifyJwt = require('../helpers/verifyjwt');
const Conversation = require('../models/Conversation');

module.exports = async ({headers}) => {

  const { Authorization } = headers;
    
  const isJwtValid = verifyJwt(Authorization);
  if (!isJwtValid) return {
    statusCode: 401,
    body: JSON.stringify({ok: false, message: 'Token no válido'})
  }

  try {
    const conversationList = await Conversation.find({user: isJwtValid.id});

    const newList = conversationList.map(({_doc: {_id, user, __v, ...element}}) => {
      return {
        id: _id.toString(),
        ...element,
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true, 
        message: 'Conversaciones encontradas',
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