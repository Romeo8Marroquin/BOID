import { useState } from "react"
import './RegisterPage.css'
import { Button } from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";

const FIELDS = {
  USER: 'user',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM: 'confirm'
};

export const RegisterPage = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('-');
  const [terms, setTerms] = useState(false);
  
  const { register } = useAuth();

  const navigate = useNavigate();

  const onChange = (e) => {
    switch (e.target.name) {
      case FIELDS.USER:
        setUser(e.target.value);
        break;
      case FIELDS.EMAIL:
        setEmail(e.target.value);
        break;

      case FIELDS.PASSWORD:
        setPassword(e.target.value);
        break;

      case FIELDS.CONFIRM:
        setConfirm(e.target.value);
        break;
    
      default:
        break;
    }
  }

  const onTerms = () => {
    setTerms(!terms);
  }

  const onReturn = () => {
    navigate(-1);
  }

  const onLogin = () => {
    navigate('/login');
  }

  const onSubmit = async () => {

    if (user === '' || email === '' || password === '' || confirm === '') {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!terms) {
      setError('Se deben aceptar los términos y condiciones');
      return;
    }

    if (email.split('@').length !== 2 || email.split('.').length !== 2) {
      setError('El correo electrónico no es válido');
      return;
    }

    if (user.split('@').length > 1) {
      setError('El nombre de usuario no es válido');
      return;
    }

    const { data } = await register(email, password, user);
    
    if (data.ok) {
      navigate('/login');
    } else {
      setError(data.message);
    }
  }

  return (
    <section className="register-section">
      <svg onClick={onReturn} width="25" height="33" viewBox="0 0 25 33" fill="none">
        <path d="M17 25L8 16.5L17 8" stroke="#F0F0F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <h1 className="font-title">BOID</h1>
      <form>
        <h2 className="font-subtitle">Registrarse</h2>
        <input className="font-text" autoComplete="username" type="text" name="user" placeholder="Nombre de usuario" value={user} onChange={onChange} />
        <input className="font-text" autoComplete="email" type="email" name="email" placeholder="Correo electrónico" value={email} onChange={onChange} />
        <input className="font-text" autoComplete="current-password" type="password" name="password" placeholder="Contraseña" value={password} onChange={onChange} />
        <input className="font-text" autoComplete="current-password" type="password" name="confirm" placeholder="Confirmar contraseña" value={confirm} onChange={onChange} />
        <div className="form-bottom">
          <label onClick={onTerms} htmlFor="terms">
            <div className={`checkbox ${terms ? 'checked' : ''}`}></div>
            <span className="font-small-text">Términos y condiciones</span>
          </label>
          <Button callback={onSubmit} label="Ingresar" />
        </div>
        <h3 className={`font-small-text ${error === '-' ? 'opacity' : ''}`}>{error}</h3>
      </form>
      <p className="font-text">Ya tienes cuenta, <span onClick={onLogin}>inicia sesión</span></p>
    </section>
  )
}
