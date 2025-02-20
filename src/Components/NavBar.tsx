import React from 'react'
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className='navbar'> 
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/bus-routes">Bus Routes</a></li>
            </ul>
        </nav>
    )
}

export default NavBar