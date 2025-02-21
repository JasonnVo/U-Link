import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import CountButton from './Components/CountButton'
import HeaderContainer from './Components/HeaderContainer'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderContainer /> 
    <CountButton />
  </StrictMode>,
)
