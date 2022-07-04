import React, { useState } from 'react'

import classes from "./Register.module.css"

import useFirebase from "../../hooks/useFirebase"
import useInput from "../../hooks/useInput"

import validation from "../../settings/validation"

const validateUser = (input:string) =>{
    const obj = validation.validateUsername(input)
    return obj.valid
}
const validateEm = (input:string) =>{
    const obj = validation.validateEmail(input)
    return obj.valid
}
const validatePass = (input:string) =>{
    const obj = validation.validatePassword(input)
    return obj.valid
}

type Props = {
    onSwitch:()=>void
}

const Register = (props: Props) => {
    /**
     * Initialization of form logic
     */
    
    const {
        value:username,
        valueChangeHandler:usernameChangeHandler,
        blurHandler:usernameBlurHandler,
        resetHandler:usernameResetHandler,
        valueIsValid:usernameIsValid
    } = useInput(validateUser)
    const {
        value:email,
        valueChangeHandler:emailChangeHandler,
        blurHandler:emailBlurHandler,
        resetHandler:emailResetHandler,
        valueIsValid:emailIsValid
    } = useInput(validateEm)
    const {
        value:password,
        valueChangeHandler:passwordChangeHandler,
        blurHandler:passwordBlurHandler,
        resetHandler:passwordResetHandler,
        valueIsValid:passwordIsValid
    } = useInput(validatePass)
    const {
        value:confirmPassword,
        valueChangeHandler:confirmPasswordChangeHandler,
        blurHandler:confirmPasswordBlurHandler,
        resetHandler:confirmPasswordResetHandler,
        valueIsValid:confirmPasswordIsValid
    } = useInput(validatePass)

    const {registerUser} = useFirebase()

    const handleRegister = (event:React.MouseEvent) =>{
        event.preventDefault()
        console.log(usernameIsValid,passwordIsValid,emailIsValid)
    }
    const handleSwitchOperation = () =>{
        props.onSwitch()
    }
    return (
        <>
            <h2>Sign Up</h2>
            <form className={classes[`register-form`]}>
                <div className={classes[`input-module`]}>
                    <section className={classes[`register-credentials`]}>
                        <label htmlFor='register-username'>Username</label>
                        <input onChange={usernameChangeHandler} onBlur={usernameBlurHandler} value = {username} placeholder = "Type ..." type = 'text' name = 'register-username'/>
                    </section>
                    <p className={classes[`input-validation`]}></p>
                </div>
                <div className={classes[`input-module`]}>
                    <section className={classes[`register-credentials`]}>
                        <label htmlFor='register-email'>Email</label>
                        <input onChange = {emailChangeHandler} onBlur = {emailBlurHandler} value = {email} placeholder = "Type ..." type = 'text' name = 'register-email'/>
                    </section>
                    <p className={classes[`input-validation`]}></p>
                </div>
                <div className={classes[`input-module`]}>
                    <section className={classes[`register-credentials`]}>
                        <label htmlFor='register-password'>Password</label>
                        <input onChange={passwordChangeHandler} onBlur = {passwordBlurHandler} value = {password} placeholder = "Type ..." type = 'password' name = 'register-password'/>
                    </section>
                    <p className={classes[`input-validation`]}></p>
                </div>
                <div className={classes[`input-module`]}>
                    <section className={classes[`register-credentials`]}>
                        <label htmlFor='register-confirm-password'>Confirm password</label>
                        <input onChange={confirmPasswordChangeHandler} onBlur = {confirmPasswordBlurHandler} value = {confirmPassword} placeholder = "Type ..." type = 'password' name = 'register-confirm-password'/>
                    </section>
                    <p className={classes[`input-validation`]}></p>
                </div>
                <button onClick = {handleRegister} className={classes[`big-button`]}>Register</button>
                <p>Already have an account? <span className={classes[`sign-in`]} onClick={handleSwitchOperation}>Sign In</span></p>
            </form>
        </>
  )
}

export default Register