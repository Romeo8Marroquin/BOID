import { AuthContext } from './auth/context/AuthContext'
import { AppRouter } from './router/AppRouter'
import { useState } from 'react';

function App() {

  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');
  
  return (
    <AuthContext.Provider value={{logged, setLogged, username, setUsername}}>
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
