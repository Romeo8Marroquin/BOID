import { boidApi } from "../../shared/boidApi";

export const chatHook = () => {

    const createNewConversation = (title) => {
        boidApi.post('/conversation', {
            title,
        }, {
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        }).catch(() => {});
    }

    const getConversations = () => {
        return boidApi.get('/conversations', {
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        }).catch(() => ({ data: { conversations: [] } }));
    }

    const deleteConversation = (id) => {
        return boidApi.delete('/conversation', {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            params: {
                id,
            }
        }).catch(() => {});
    }

    const getMessages = (conversation) => {
        return boidApi.get('/requests', {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            params: {
                conversation,
            }
        }).catch(() => ({ data: { conversations: [] } }));
    }

    const sendMessage = (conversation, request) => {
        return boidApi.post('/request', {
            conversation,
            request,
        }, {
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        }).catch(() => ({ data: { conversations: [] }}));
    }

    return {
        createNewConversation, getConversations, deleteConversation, getMessages, sendMessage,
    }
}
