import { AuthContext } from './auth/context/AuthContext'
import { AppRouter } from './router/AppRouter'
import { AuthReducer } from './auth/hooks/AuthHook';

function App() {

  const state = AuthReducer();
  
  return (
    <AuthContext.Provider value={state}>
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
