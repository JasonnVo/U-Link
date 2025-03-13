import './NavBar.css'
import { Link } from "react-router-dom";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const NavBar = () => {
    return (
        <nav className='navbar'> 
            <DirectionsBusIcon className='bus-icon'/>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/info">Info</Link></li>
                <li><Link to="/map">Map</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar