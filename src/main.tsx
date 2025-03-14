import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
// component imports
import HeaderContainer from "./Components/HeaderContainer";
import BusTracker from "./Components/BusTracker";
import NavBar from "./Components/NavBar";
import Map from "./Components/Map";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Leaderboard from "./Components/Leaderboard";
import BusRoutesList from './BusRoutesList';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className=''>
      <Router>
        <NavBar />  
        <Routes>
          <Route path="/" element={<HeaderContainer/>} />
          <Route path="/map" element={<Map/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/info" element={<BusRoutesList/>} />
        </Routes>
        <BusTracker />
      </Router>
    </div>
  </StrictMode>,
);
