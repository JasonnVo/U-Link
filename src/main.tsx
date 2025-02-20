import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CountButton from './Components/CountButton'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CountButton />
  </StrictMode>,
)
