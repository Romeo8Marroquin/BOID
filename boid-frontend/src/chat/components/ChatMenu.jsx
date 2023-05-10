import { useContext, useState } from "react";
import PropTypes from 'prop-types'
import './ChatMenu.css'
import { AuthContext } from "../../auth/context/AuthContext";
import { Button } from "../../shared/components/Button";
import { useAuth } from "../../auth/hooks/AuthHook";
import { chatHook } from "../hooks/ChatHook";
import { useEffect } from "react";

export const ChatMenu = ({setActiveConversation}) => {

    const { username } = useContext(AuthContext);
    const { createNewConversation, getConversations, deleteConversation } = chatHook();
    
    const [display, setDisplay] = useState(false)
    const [creatingNew, setCreatingNew] = useState(false)
    const [newConversation, setNewConversation] = useState('')
    const [conversations, setConversations] = useState([])

    const { logout } = useAuth();

    useEffect(() => {
        getConversations().then(({data}) => {
            setConversations(data.conversations || []);
        });
    }, [creatingNew, getConversations]);
    

    const onDisplay = () => {
        if (creatingNew) setCreatingNew(false);
        setDisplay(!display);
    }

    const onLogout = () => {
        logout();
    }

    const onCreateConversation = (e) => {
        e?.preventDefault();
        setCreatingNew(false);
        if (newConversation.trim() === '') return;
        createNewConversation(newConversation);
        setNewConversation('');
        getConversations().then(({data}) => {
            setConversations(data.conversations || []);
            onSetActiveConversation(data.conversations[data.conversations.length - 1]);
        });
    }

    const onDeleteConversation = async (id) => {
        await deleteConversation(id);
        getConversations().then(({data}) => {
            setConversations(data.conversations || []);
        });
    }

    const onSetActiveConversation = (conversation) => {
        setActiveConversation(conversation);
        setCreatingNew(false);
        setDisplay(false);
    } 

  return (
    <section className='menu-area'>
        <div className={display ? 'extension down' : 'extension'}>
            <span className='font-title alternative-title'>BOID</span>
            <h2 className="font-subtitle">{username}</h2>
          <ul>
            {
                conversations.map((conversation) => (
                    <li key={conversation.id}>
                        <span onClick={() => onSetActiveConversation(conversation)} className='font-text'>{conversation.title}</span>
                        <svg onClick={() => onDeleteConversation(conversation.id)} width="17" height="21" viewBox="0 0 17 21" fill="none">
                            <path d="M6.42222 10.2321V15.0536M10.8222 10.2321V15.0536M8.62222 10.2321V15.0536M14 7.01786V4.875H3V7.01786M6.66667 4.07143L7.64444 3H9.35556L10.3333 4.07143M3.97778 7.01786V18H13.0222V7.01786H3.97778Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </li>
                ))
            }
            {
                creatingNew ? (
                    <li>
                        <form onSubmit={onCreateConversation}>
                            <input className='font-text' type="text" placeholder="Nueva conversación" value={newConversation} onChange={(e) => setNewConversation(e.target.value)} />
                        </form>
                        <svg onClick={onCreateConversation} width="25" height="33" viewBox="0 0 25 33" fill="none">
                            <path d="M8 8L17 16.5L8 25" stroke="#F0F0F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </li>
                ) : (
                    <li onClick={() => setCreatingNew(true)}>
                        <div className="plus">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clipPath="url(#clip0_259_2)">
                                    <path d="M12 2V22M2 12H22" stroke="#F0F0F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_259_2">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </li>
                )
            }
          </ul>
          <div className="button">
            <Button callback={onLogout} label="Cerrar sesión" />
          </div>
        </div>
        <section className='navbar' >
            <svg className='svg' onClick={onDisplay} width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path className={display ? 'rotate-clockwise' : 'rotate-return'} d="M4 6H21" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
                <path className={display ? 'hidden' : 'displayed'} d="M4 12H21" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
                <path className={display ? 'rotate-counter-clockwise' : 'rotate-counter-return'} d="M4 18H21" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className={display ? 'nav-title font-title hidden' : 'nav-title font-title displayed'}>BOID</span>
        </section>
      </section>
  )
}

ChatMenu.propTypes = {
    setActiveConversation: PropTypes.func.isRequired,
}