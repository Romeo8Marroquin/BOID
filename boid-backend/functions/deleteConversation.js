const verifyjwt = require('../helpers/verifyjwt');
const Request = require('../models/Request');

module.exports = async ({headers, queryStringParameters}) => {

    const { Authorization } = headers;

    if (!Authorization) return {
        statusCode: 401,
        body: JSON.stringify({ok: false, message: 'Autenticación no válida'})
    }

    const isJwtValid = verifyjwt(Authorization);

    if (!isJwtValid) return {
        statusCode: 401,
        body: JSON.stringify({ok: false, message: 'Autenticación no válida'})
    }

    const { id } = queryStringParameters || {};

    if (!id) return {
        statusCode: 400,
        body: JSON.stringify({ok: false, message: 'Los parámetros no son válidos'})
    }

    const Conversation = require('../models/Conversation');
    try {
        const verifyConf = await Conversation.findById(id);
    
        if (!verifyConf) return {
            statusCode: 404,
            body: JSON.stringify({ok: false, message: 'Conversación no encontrada'})
        }

        if (verifyConf.user.toString() !== isJwtValid.id) return {
            statusCode: 401,
            body: JSON.stringify({ok: false, message: 'Autenticación no válida'})
        }
    
        await Conversation.deleteOne({_id: id});
        await Request.deleteMany({conversation: id});
    
        return {
            statusCode: 200,
            body: JSON.stringify({ok: true, message: 'Conversación eliminada'})
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ok: false, message: 'Error al eliminar la conversación'})
        }
    }
};