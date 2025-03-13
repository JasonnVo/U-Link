import { Link } from "react-router-dom";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const NavBar = () => {
    return (
        <nav className="fixed top-0 left-0 flex w-full items-center justify-end bg-black/20 py-7">
            <div className="absolute left-8">
                <DirectionsBusIcon className="h-8 w-8 text-white" />
            </div>
            <ul className="absolute right-8 flex gap-5 list-none m-0">
                <li><Link to="/" className="font-bold text-[#657fcf] hover:underline">Home</Link></li>
                <li><Link to="/login" className="font-bold text-[#657fcf] hover:underline">Login</Link></li>
                <li><Link to="/info" className="font-bold text-[#657fcf] hover:underline">Info</Link></li>
                <li><Link to="/map" className="font-bold text-[#657fcf] hover:underline">Map</Link></li>
                <li><Link to="/leaderboard" className="font-bold text-[#657fcf] hover:underline">Leaderboard</Link></li>
                <li><Link to="/profile" className="font-bold text-[#657fcf] hover:underline">Profile</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
