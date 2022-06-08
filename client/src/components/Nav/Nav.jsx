import React, {useState} from 'react'
import './nav.css'
import {HiMenuAlt4, HiX} from 'react-icons/hi'
import logo from '../../../assets/Branding-Logo.svg'

const NavItem = ({ name, link }) => {
    return (
        <li className='nav-item'>
        <a href={link}>{name}</a>
        </li>
    )
}

export const Nav = () => {
    const [toggle, setToggle] = useState(false)
  return (
    <nav className='navbar '>
        <img className='logo' src={logo} alt="logo" />
        <ul className='nav-links'>
            {["Gallery", "Information", "Project"].map((name, index) => (
                <NavItem key={index} name={name} link="#" />
            ))}
        </ul>

        <div className='app__navbar-menu'>
            <HiMenuAlt4 className='nav-mobile-icon'onClick={() => setToggle(true)}/>

            {
                toggle && (
                    <div className='mobile-menu backdrop-blur-menu'>
                        <HiX className='nav-close-icon' onClick={() => setToggle(false)}/>
                        <ul className='mobile-list'>
                            {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                                <li className='mobile-item app__flex-center p-text' key={`${item}`}>
                                    <a className='mobile-anchor' href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                                </li>
                            ))}
                         </ul>
                    </div>
                )}
        </div>

    </nav>
  )
}
