import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main.css';
// component imports
import CountButton from './Components/CountButton';
import HeaderContainer from './Components/HeaderContainer';
import BusTracker from './Components/BusTracker';
import NavBar from './Components/NavBar';  
import Map from './Components/Map'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HeaderContainer/>} />
        <Route path="/map" element={<Map/>} />
      </Routes>
      <BusTracker />
      <CountButton />
    </Router>
  </StrictMode>,
);
