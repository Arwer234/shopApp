import React from 'react'
import logo from '../../imgs/building-128.png'
import loginImg from "../../imgs/icons8-person-64.png"
import cartImg from "../../imgs/cart-64-64.png"

import classes from "./Header.module.css"

type Props = {}

const Header = (props: Props) => {

  const handleLoginClick = () =>{
    
  }
  const handleCartClick = () =>{

  }
  return (
    <header className = {classes.header}>
        <h1 className = {classes.title}>Shop App</h1>
        <img className = {classes.logo} src = {logo} alt = "Logo" />
        <div className = {classes[`header-controls`]}>
          <div onClick = {handleLoginClick} className = {classes[`header-login`]}>
            <img className={classes[`header-login-img`]} src = {loginImg}/>
            <p className={classes[`header-login-desc`]}>Login</p>
          </div>
          <div onClick = {handleCartClick} className={classes[`header-cart`]}>
            <img className={classes[`header-cart-img`]} src = {cartImg}/>
            <p className={classes[`header-cart-desc`]}>Cart</p>
          </div>
        </div>
    </header>
  )
}
export default Header