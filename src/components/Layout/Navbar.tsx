import React from 'react'

import classes from "./Navbar.module.css"
import home from '../../imgs/home-2-32.png'


type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className={classes.navbar}>
        <img className = {classes.home} src = {home} alt = "home"/>
        <p>link</p>
        <p>link</p>
        <p>link</p>
        <p>link</p>
    </nav>
  )
}
export default Navbar