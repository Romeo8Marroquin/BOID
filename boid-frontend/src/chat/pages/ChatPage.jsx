import React from 'react'
import { useEffect, useRef, useState } from 'react'
import './ChatPage.css'
import { ChatMenu } from '../components/ChatMenu'
import { chatHook } from '../hooks/ChatHook'

export const ChatPage = () => {

  const [activeConversation, setActiveConversation] = useState(undefined);
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')

  const scrollable = useRef()

  const { getMessages, sendMessage } = chatHook();

  useEffect(() => {
    if (!activeConversation) return;
    getMessages(activeConversation.id).then(({data}) => {
      setMessages(data.conversations);
    });
  }, [activeConversation])

  useEffect(() => {
    scrollable.current.scrollTop = scrollable.current.scrollHeight
  }, [messages])

  const onSubmitRequest = async (e) => {
    e?.preventDefault();
    await sendMessage(activeConversation.id, currentMessage)
    setCurrentMessage('');
    getMessages(activeConversation.id).then(({data}) => {
      setMessages(data.conversations);
    });
  }

  return (
    <section className="chat-section">
      <ChatMenu setActiveConversation={setActiveConversation} />
      
      <section className='messages-area'>
        <div className="chat" ref={scrollable}>
          {
            messages.map((message) => (
              <React.Fragment key={message.id}>
                <div className="message">
                  <p className='font-text messagem'>{message.request}</p>
                </div>
                <div className="reply">
                  <p className='font-text replym'>{message.response}</p>
                </div>
              </React.Fragment>
            ))
          }
        </div>
        <div className='input-area'>
          <form onSubmit={onSubmitRequest}>
            <div className="typing">
              <input value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} className='form-text' type="text" placeholder='Ingresar consulta' readOnly={!activeConversation} />

              <svg onClick={onSubmitRequest} width="25" height="33" viewBox="0 0 25 33" fill="none">
                <path d="M8 8L17 16.5L8 25" stroke="#F0F0F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </form>
        </div>
      </section>
    </section>
  )
}
