import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import CountButton from './Components/CountButton'
import HeaderContainer from './Components/HeaderContainer'
import BusTracker from './Components/BusTracker'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderContainer /> 
    <BusTracker />
    <CountButton />
  </StrictMode>,
)
