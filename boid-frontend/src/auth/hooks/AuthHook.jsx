import { useContext } from "react";
import { boidApi } from "../../shared/boidApi";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'

export const useAuth = () => {

  const { logged, setLogged, username, setUsername } = useContext(AuthContext);

    const login = async (username, password) => {
      const { data } = await boidApi.post('/login', {
        username,
        password,
      }).catch(() => ({
        data: {
          ok: false,
          message: 'Error al ingresar, intente de nuevo'
        }
      }));

      if (data.ok) {
        setLogged(true);
        setUsername(data.username);
        localStorage.setItem('token', "Bearer " + data.token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
      }
      return {data};
    }

    const verify = async () => {
      const { data } = await boidApi.get('/verify', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).catch(() => ({data: {ok: false}}));

      if (data.ok) {
        setLogged(true);
        setUsername(data.username);
        localStorage.setItem('token', "Bearer " + data.token);
      }
    }

    const logout = () => {
        setLogged(false);
        setUsername('');
        localStorage.removeItem('token');
    }

    const register = (email, password, username) => boidApi.post('/register', {
      username,
      email,
      password,
    }).catch(() => ({
      data: {
        ok: false,
        message: 'Error al registrar el usuario'
      }
    }));

  return {
    logged, username, login, verify, logout, register
  }
}
