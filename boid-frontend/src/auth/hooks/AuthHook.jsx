import { useState } from "react"

export const AuthReducer = () => {

    const [logged, setLogged] = useState(true);
    const [username, setUsername] = useState('');

    const login = (email, password) => {
        //TODO: Llamar a la api
        setLogged(true);
        setUsername('Prueba');
    }

    const logout = () => {
        //TODO: Llamar a la api
        setLogged(false);
        setUsername({});
    }

    const register = (email, password, username) => {
        //TODO: llamar a la api
        setLogged(true);
        setUsername(username);
    }

  return {
    logged, username, login, logout, register
  }
}
