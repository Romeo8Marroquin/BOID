import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useState } from 'react';

export const Navbar = () => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    }

    const handleLogin = () => {
      navigate('/login');
    }

    const handleRegister = () => {
      navigate('/register');
    }

    const [display, setDisplay] = useState(false)

    const onDisplay = () => {
      setDisplay(!display);
    }

  return (
    <>
      <div className={display ? 'extension down' : 'extension'}>
        <ul>
          <li className='font-text' onClick={handleLogin}>Inicia sesión</li>
          <li className='font-text'  onClick={handleRegister}>Regístrate</li>
        </ul>
      </div>
      <section className='navbar' >
          <svg className='svg' onClick={onDisplay} width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path className={display ? 'rotate-clockwise' : 'rotate-return'} d="M4 6H21" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
              <path className={display ? 'hidden' : 'displayed'} d="M4 12H21" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
              <path className={display ? 'rotate-counter-clockwise' : 'rotate-counter-return'} d="M4 18H21" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className={display ? 'nav-title font-title hidden' : 'nav-title font-title displayed'}  onClick={handleHome}>BOID</span>
      </section>
    </>
  )
}
