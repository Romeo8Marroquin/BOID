import { useEffect, useRef, useState } from 'react'
import './ChatPage.css'
import { ChatMenu } from '../components/ChatMenu'

const chat = [
  {
    id: 'abc123',
    message: 'Texto de prueba para realizar el diseño de la interfaz en el chat, este diseño está sujeto a posibles cambios.',
    isReply: true
  },
  {
    id: 'abc124',
    message: 'Texto de prueba para realizar el diseño de la interfaz en el chat, este diseño está sujeto a posibles cambios.',
    isReply: false
  },
  {
    id: 'abc1232',
    message: 'Texto de prueba para realizar el diseño de la interfaz en el chat, este diseño está sujeto a posibles cambios.',
    isReply: true
  },
  {
    id: 'abc1242',
    message: 'Texto de prueba para realizar el diseño de la interfaz en el chat, este diseño está sujeto a posibles cambios.',
    isReply: false
  },
  {
    id: 'abc1233',
    message: 'Texto de prueba para realizar el diseño de la interfaz en el chat, este diseño está sujeto a posibles cambios.',
    isReply: true
  },
  {
    id: 'abc1243',
    message: 'Texto de prueba para realizar el diseño de la interfaz en el chat, este diseño está sujeto a posibles cambios.',
    isReply: false
  },
  {
    id: 'abc1234',
    message: 'Texto de prueba para realizar el diseño de la interfaz en el chat, este diseño está sujeto a posibles cambios.',
    isReply: true
  },
  {
    id: 'abc1244',
    message: 'Texto de prueba para realizar el diseño de la interfaz en el chat, este diseño está sujeto a posibles cambios.',
    isReply: false
  },
]

export const ChatPage = () => {

  const [activeConversation, setActiveConversation] = useState(undefined);

  const scrollable = useRef()

  useEffect(() => {
    scrollable.current.scrollTop = scrollable.current.scrollHeight
  }, [])
  

  return (
    <section className="chat-section">
      <ChatMenu setActiveConversation={setActiveConversation} />
      
      <section className='messages-area'>
        <div className="chat" ref={scrollable}>
          {
            chat.map((message, i) => (
              <div className={`${message.isReply ? 'reply' : 'message'}`} key={message.id}>
                <p className={message.isReply ? 'font-text replym' : 'font-text messagem'}>{message.message}</p>
              </div>
            ))
          }
        </div>
        <div className='input-area'>
          <form>
            <div className="typing">
              <input className='form-text' type="text" placeholder='Ingresar consulta' />

              <svg width="25" height="33" viewBox="0 0 25 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8L17 16.5L8 25" stroke="#F0F0F0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </form>
        </div>
      </section>
    </section>
  )
}
