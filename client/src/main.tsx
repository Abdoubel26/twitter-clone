import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SelectedUserContextProvider } from './context/selectedUserContext.tsx'
import { AuthContextProvider } from './context/authContext.tsx'
import { ThisUserContextProvider } from './context/thisUserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThisUserContextProvider>
    <AuthContextProvider>
    <SelectedUserContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </SelectedUserContextProvider>
    </AuthContextProvider>
    </ThisUserContextProvider>
  </StrictMode>,
)
