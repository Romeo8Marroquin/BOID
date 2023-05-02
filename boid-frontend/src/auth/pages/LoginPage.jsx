import { useState } from "react"
import './LoginPage.css'
import { Button } from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";

const FIELDS = {
  USER: 'user',
  PASSWORD: 'password'
};

export const LoginPage = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('-');

  const navigate = useNavigate();

  const onChange = (e) => {
    switch (e.target.name) {
      case FIELDS.USER:
        setUser(e.target.value);
        break;

      case FIELDS.PASSWORD:
        setPassword(e.target.value);
        break;
    
      default:
        break;
    }
  }

  const onReturn = () => {
    navigate(-1);
  }

  const onRegister = () => {
    navigate('/register');
  }

  const onSubmit = () => {
    if (user === '' || password === '') {
      setError('Todos los campos son obligatorios');
      return;
    }
  }

  return (
    <section className="login-section">
      <svg onClick={onReturn} width="25" height="33" viewBox="0 0 25 33" fill="none">
        <path d="M17 25L8 16.5L17 8" stroke="#F0F0F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <h1 className="font-title">BOID</h1>
      <form>
        <h2 className="font-subtitle">Iniciar Sesión</h2>
        <input className="font-text" autoComplete="email" type="email" name="user" placeholder="Usuario o correo" value={user} onChange={onChange} />
        <input className="font-text" autoComplete="current-password" type="password" name="password" placeholder="Contraseña" value={password} onChange={onChange} />
        <Button callback={onSubmit} label="Ingresar" />
        <h3 className={`font-small-text ${error === '-' ? 'opacity' : ''}`}>{error}</h3>
      </form>
      <p className="font-text">No tienes cuenta, <span onClick={onRegister}>regístrate</span></p>
    </section>
  )
}
