import React from 'react'

import classes from "./Login.module.css"

type Props = {}

const Login = (props: Props) => {
    
    return (
        <>
            <h2>Login</h2>
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
                <button className={classes[`big-button`]}>Login</button>
            </form>
        </>
    )
}

export default Login