import React from 'react'
import logo from '../imgs/building-128.png'
import classes from "./Header.module.css"

type Props = {}

const Header = (props: Props) => {
  return (
    <header className = {classes.header}>
        <h1 className = {classes.title}>Shop App</h1>
        <img className = {classes.logo} src = {logo} alt = "Logo" />
    </header>
  )
}
export default Header