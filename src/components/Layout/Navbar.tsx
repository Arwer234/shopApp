import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from "./Navbar.module.css"
import home from '../../imgs/home-2-32.png'


type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className={classes.navbar}>
        <NavLink to ={"/"}>Home</NavLink>
        <NavLink to ={"/about"}>About</NavLink>
        <NavLink to ={"/contact"}>Contact</NavLink>
    </nav>
  )
}
export default Navbar