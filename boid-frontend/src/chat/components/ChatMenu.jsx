import { useContext, useState } from "react";
import PropTypes from 'prop-types'
import './ChatMenu.css'
import { AuthContext } from "../../auth/context/AuthContext";
import { Button } from "../../shared/components/Button";

const conversations = [
    {
        id: 'abc123',
        name: 'Conversation 1'
    },
    {
        id: 'abc124',
        name: 'Conversation 2'
    },
    {
        id: 'abc1251',
        name: 'Conversation 3'
    },
    {
        id: 'abc12512',
        name: 'Conversation 3'
    },
    {
        id: 'abc12513',
        name: 'Conversation 3'
    },
    {
        id: 'abc125134',
        name: 'Conversation 3'
    },
    {
        id: 'abc125135',
        name: 'Conversation 3'
    },
    {
        id: 'abc125133',
        name: 'Conversation 3'
    },
    {
        id: 'abc1251342',
        name: 'Conversation 3'
    },
    {
        id: 'abc1251351',
        name: 'Conversation 3'
    },
    {
        id: 'abc125',
        name: 'Conversation 3'
    }
];

export const ChatMenu = ({setActiveConversation}) => {

    const { username } = useContext(AuthContext);
    
    const [display, setDisplay] = useState(false)

    const onDisplay = () => {
        setDisplay(!display);
    }

    const onLogout = () => {

    }

  return (
    <section className='menu-area'>
        <div className={display ? 'extension down' : 'extension'}>
            <span className='font-title alternative-title'>BOID</span>
            <h2 className="font-subtitle">{username}</h2>
          <ul>
            {
                conversations.map((conversation) => (
                    <li onClick={() => setActiveConversation(conversation.id)} key={conversation.id}>
                        <span className='font-text'>{conversation.name}</span>
                        <svg width="17" height="21" viewBox="0 0 17 21" fill="none">
                            <path d="M6.42222 10.2321V15.0536M10.8222 10.2321V15.0536M8.62222 10.2321V15.0536M14 7.01786V4.875H3V7.01786M6.66667 4.07143L7.64444 3H9.35556L10.3333 4.07143M3.97778 7.01786V18H13.0222V7.01786H3.97778Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </li>
                ))
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