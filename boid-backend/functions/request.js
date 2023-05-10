const verifyjwt = require('../helpers/verifyjwt');
const Conversation = require('../models/Conversation');
const Request = require('../models/Request');

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

    const { conversation, request } = JSON.parse(body);

    if (!conversation || !request) return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ok: false, message: 'Los parámetros no son válidos'})
    }

    try {

        const activeConversation = await Conversation.findById(conversation);

        if (!activeConversation) return {
            statusCode: 404,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ok: false, message: 'Conversación no encontrada'})
        }

        const dialogflow = require('dialogflow');
        const config = require('../boid-keys');
        
        const sessionClient = new dialogflow.SessionsClient({
            projectId: config.project_id,
            credentials: {
                client_email: config.client_email,
                private_key: config.private_key
            }
        });
        
        const sessionPath = sessionClient.sessionPath(config.project_id, isJwtValid.id);
        
        const requestObject = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: request,
                    languageCode: config.session_language_code
                }
            }
        }

        const response = await sessionClient.detectIntent(requestObject);
        const newResponse = response[0].queryResult.fulfillmentText;

        const newRequest = new Request({
            conversation: conversation,
            request,
            response: newResponse
        })

        let saved = false;
        await newRequest.save().then(() => {
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
            body: JSON.stringify({ok: false, message: 'No se pudo crear la request'})
        }

        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ok: true, message: 'Request creada'})
        }
        
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ok: false, message: 'Error al crear la solicitud'})
        }
    }
};