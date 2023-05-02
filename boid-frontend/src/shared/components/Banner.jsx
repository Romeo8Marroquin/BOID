import { useNavigate } from 'react-router-dom';
import './Banner.css';
import { Button } from './Button';

export const Banner = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register');
  }
  
  return (
    <>
        <div className="banner">
        </div>
        <section className="shadow">
            <div className="content">
                <span className='font-subtitle'>Infórmate sobre la diabetes</span>
                <Button label="Inicia sesión" callback={handleLogin} isTitle />
                <span className='font-subtitle'>o</span>
                <Button label="Regístrate"  callback={handleRegister} isTitle />
                <span className='font-text'>Implementación Guatemalteca</span>
            </div>
        </section>
    </>
  )
}
