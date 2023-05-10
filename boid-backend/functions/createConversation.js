const verifyjwt = require('../helpers/verifyjwt');

module.exports = async ({headers, body}) => {

    const { Authorization } = headers;

    if (!Authorization) return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: false, message: 'Autenticación no válida'})
    }

    const isJwtValid = verifyjwt(Authorization);

    if (!isJwtValid) return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: false, message: 'Autenticación no válida'})
    }

    const { title } = JSON.parse(body);

    if (!title) return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: false, message: 'Los parámetros no son válidos'})
    }

    const Conversation = require('../models/Conversation');

    const newConversation = new Conversation({title, user: isJwtValid.id, created: new Date()});
    let saved = false;
    await newConversation.save().then(() => {
        saved = true;
    }).catch(err => {
        console.log(err);
    });

    if (!saved) return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: false, message: 'No se pudo crear la conversación'})
    }

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: true, message: 'Conversación creada'})
    }
};