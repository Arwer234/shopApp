import React, { useState } from 'react'

import classes from "./Register.module.css"

import useFirebase from "../../hooks/useFirebase"
import useInput from "../../hooks/useInput"

import validation from "../../settings/validation"

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
    } = useInput(validation.validateUsername)
    const {
        value:email,
        valueChangeHandler:emailChangeHandler,
        blurHandler:emailBlurHandler,
        resetHandler:emailResetHandler,
        valueIsValid:emailIsValid
    } = useInput(validation.validateEmail)
    const {
        value:password,
        valueChangeHandler:passwordChangeHandler,
        blurHandler:passwordBlurHandler,
        resetHandler:passwordResetHandler,
        valueIsValid:passwordIsValid
    } = useInput(validation.validatePassword)
    const {
        value:confirmPassword,
        valueChangeHandler:confirmPasswordChangeHandler,
        blurHandler:confirmPasswordBlurHandler,
        resetHandler:confirmPasswordResetHandler,
        valueIsValid:confirmPasswordIsValid
    } = useInput(validation.validatePassword)

    const {registerUser} = useFirebase()

    const [message,setMessage] = useState({status:"unset", message:""})

    const handleRegister = async(event:React.MouseEvent) =>{
        event.preventDefault()
        if(usernameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid && password === confirmPassword){
            const {status,message:responseMessage} = await registerUser(email,password)
            setMessage({status,message:responseMessage})
        }
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
                <p className={classes[`register-message`]}>
                    {message.status === "success" && message.message}
                    {message.status === "failure" && message.message}
                </p>
            </form>
        </>
  )
}

export default Register