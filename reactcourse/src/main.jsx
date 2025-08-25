import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import ThemeComponent from "./contexts/ThemeComponent.jsx";
import AuthContextProvider from './contexts/AuthContext.jsx';
import TodoListContextProvider from './contexts/TodoListCOntext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <TodoListContextProvider>
    <ThemeComponent>
    <App />
  </ThemeComponent>
  </TodoListContextProvider>
  </AuthContextProvider>
  </StrictMode>,
)
