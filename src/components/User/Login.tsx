import React,{useState} from 'react'

import useFirebase from '../../hooks/useFirebase'

import classes from "./Login.module.css"

type Props = {
    onSwitch:()=>void
}

const Login = (props: Props) => {

    const handleLogin = (event:React.MouseEvent) =>{
        event.preventDefault()
        //loginUser()
    }
    const handleSwitchOperation = () =>{
        props.onSwitch()
    }
    
    return (
        <>
            <h2>Sign In</h2>
            <form className={classes[`login-form`]}>
                <div className={classes[`input-module`]}>
                    <section className={classes[`login-credentials`]}>
                        <label htmlFor='login-username'>Username</label>
                        <input placeholder = "Type ..." type = 'text' name = 'login-username'/>
                    </section>
                    <p className={classes[`input-validation`]}></p>
                </div>
                <div className={classes[`input-module`]}>
                    <section className={classes[`login-credentials`]}>
                        <label htmlFor='login-password'>Password</label>
                        <input placeholder = "Type ..." type = 'password' name = 'login-password'/>
                    </section>
                    <p className={classes[`input-validation`]}></p>
                </div>
                <button onClick = {handleLogin} className={classes[`big-button`]}>Login</button>
                <p>Not a member? <span className={classes[`sign-up`]} onClick={handleSwitchOperation}>Sign Up</span></p>
            </form>
        </>
    )
}

export default Login