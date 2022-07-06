import React, { useState } from "react";

import classes from "./Register.module.css";

import useFirebase from "../../hooks/useFirebase";
import useInput from "../../hooks/useInput";

import validation, { parseValidationMessages } from "../../settings/validation";

type Props = {
	onSwitch: () => void;
};

const Register = (props: Props) => {
	/**
	 * Initialization of form logic
	 */

	const {
		value: username,
		valueChangeHandler: usernameChangeHandler,
		blurHandler: usernameBlurHandler,
		resetHandler: usernameResetHandler,
		valueIsValid: usernameIsValid,
	} = useInput(validation.validateUsername);
	const {
		value: email,
		valueChangeHandler: emailChangeHandler,
		blurHandler: emailBlurHandler,
		resetHandler: emailResetHandler,
		valueIsValid: emailIsValid,
	} = useInput(validation.validateEmail);
	const {
		value: password,
		valueChangeHandler: passwordChangeHandler,
		blurHandler: passwordBlurHandler,
		resetHandler: passwordResetHandler,
		valueIsValid: passwordIsValid,
	} = useInput(validation.validatePassword);
	const {
		value: confirmPassword,
		valueChangeHandler: confirmPasswordChangeHandler,
		blurHandler: confirmPasswordBlurHandler,
		resetHandler: confirmPasswordResetHandler,
		valueIsValid: confirmPasswordIsValid,
	} = useInput(validation.validatePassword);

	const { registerUser } = useFirebase();

	const [message, setMessage] = useState({ status: "unset", message: "" });
	const [validationMessages, setValidationMessages] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleRegister = async (event: React.MouseEvent) => {
		event.preventDefault();
		if (
			usernameIsValid.valid &&
			emailIsValid.valid &&
			passwordIsValid.valid &&
			confirmPasswordIsValid.valid &&
			password === confirmPassword
		) {
			const { status, message: responseMessage } = await registerUser(
				email,
				password
			);
			setMessage({ status, message: responseMessage });
			setValidationMessages({
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
		} else {
			const validationMessage = {
				username:
					usernameIsValid.reasons !== undefined
						? parseValidationMessages(usernameIsValid.reasons)
						: "",
				email:
					emailIsValid.reasons !== undefined
						? parseValidationMessages(emailIsValid.reasons)
						: "",
				password:
					passwordIsValid.reasons !== undefined
						? parseValidationMessages(passwordIsValid.reasons)
						: "",
				confirmPassword:
					confirmPasswordIsValid.reasons !== undefined
						? parseValidationMessages(
								confirmPasswordIsValid.reasons
						  )
						: "",
			};
			setValidationMessages(validationMessage);
		}
	};
	const handleSwitchOperation = () => {
		props.onSwitch();
	};
	return (
		<>
			<h2>Sign Up</h2>
			<form className={classes[`register-form`]}>
				<div className={classes[`input-module`]}>
					<section className={classes[`register-credentials`]}>
						<label htmlFor="register-username">Username</label>
						<input
							onChange={usernameChangeHandler}
							onBlur={usernameBlurHandler}
							value={username}
							placeholder="Type ..."
							type="text"
							name="register-username"
                            className={!usernameIsValid.valid? classes[`input__error`]:""}
						/>
					</section>
					<p className={classes[`input-validation-error`]}>
						{validationMessages.username}
					</p>
				</div>
				<div className={classes[`input-module`]}>
					<section className={classes[`register-credentials`]}>
						<label htmlFor="register-email">Email</label>
						<input
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
							value={email}
							placeholder="Type ..."
							type="text"
							name="register-email"
                            className={!emailIsValid.valid? classes[`input__error`]:""}
						/>
					</section>
					<p className={classes[`input-validation-error`]}>
						{validationMessages.email}
					</p>
				</div>
				<div className={classes[`input-module`]}>
					<section className={classes[`register-credentials`]}>
						<label htmlFor="register-password">Password</label>
						<input
							onChange={passwordChangeHandler}
							onBlur={passwordBlurHandler}
							value={password}
							placeholder="Type ..."
							type="password"
							name="register-password"
                            className={!passwordIsValid.valid? classes[`input__error`]:""}
						/>
					</section>
					<p className={classes[`input-validation-error`]}>
						{validationMessages.password}
					</p>
				</div>
				<div className={classes[`input-module`]}>
					<section className={classes[`register-credentials`]}>
						<label htmlFor="register-confirm-password">
							Confirm password
						</label>
						<input
							onChange={confirmPasswordChangeHandler}
							onBlur={confirmPasswordBlurHandler}
							value={confirmPassword}
							placeholder="Type ..."
							type="password"
							name="register-confirm-password"
                            className={!confirmPasswordIsValid.valid? classes[`input__error`]:""}
						/>
					</section>
					<p className={classes[`input-validation-error`]}>
						{validationMessages.confirmPassword}
					</p>
				</div>
				<button
					onClick={handleRegister}
					className={classes[`big-button`]}
				>
					Register
				</button>
				<p>
					Already have an account?{" "}
					<span
						className={classes[`sign-in`]}
						onClick={handleSwitchOperation}
					>
						Sign In
					</span>
				</p>
				<p className={classes[`register-message`]}>
					{message.status === "success" && message.message}
					{message.status === "failure" && message.message}
				</p>
			</form>
		</>
	);
};

export default Register;
