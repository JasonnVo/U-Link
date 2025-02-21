import './NavBar.css'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const NavBar = () => {
    return (
        <nav className='navbar'> 
            <DirectionsBusIcon className='bus-icon'/>
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/bus-routes">Bus Routes</a></li>
            </ul>
        </nav>
    )
}

export default NavBar