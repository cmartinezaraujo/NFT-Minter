import React from 'react'
import './nav.css'

const NavItem = ({ name, link }) => {
    return (
        <li className='nav-item'>
        <a href={link}>{name}</a>
        </li>
    )
}

export const Nav = () => {
  return (
    <nav className='navbar'>
        <div className='logo-initials'>
            NFTG
        </div>
        <ul className='nav-links'>
            {["Gallery", "Information", "Project"].map((name, index) => (
                <NavItem key={index} name={name} link="#" />
            ))}
        </ul>
    </nav>
  )
}
