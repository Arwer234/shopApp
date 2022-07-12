import React, { useState } from "react";

import classes from "./Auth.module.css";

import useFirebase from "../../hooks/useFirebase";
import useInput from "../../hooks/useInput";

import validation, { parseValidationMessages } from "../../settings/validation";

type Props = {};

const Auth = (props: Props) => {
	const [isToSignIn, setIsToSignIn] = useState(true);

	/**
	 * Initialization of form logic
	 */
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

	const { signUpUser, signInUser } = useFirebase();

	const [message, setMessage] = useState({ status: "unset", message: "" });
	const [validationMessages, setValidationMessages] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSignInMode = () => {
		setIsToSignIn((state) => !state);
	};

	const handleSignUp = async (event: React.MouseEvent) => {
		event.preventDefault();
		if (
			emailIsValid.valid &&
			passwordIsValid.valid &&
			confirmPasswordIsValid.valid &&
			password === confirmPassword &&
			password !== "" &&
			email !== "" &&
			confirmPassword !== ""
		) {
			const { status, message: responseMessage } = await signUpUser(
				email,
				password
			);

			setMessage({ status, message: responseMessage });

			if (status === "success") {
				setValidationMessages({
					email: "",
					password: "",
					confirmPassword: "",
				});
				emailResetHandler();
				passwordResetHandler();
				confirmPasswordResetHandler();
			}
		} else {
			const validationMessage = {
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
	const handleSignIn = async(event: React.MouseEvent) => {
		event.preventDefault()
		if (
			emailIsValid.valid &&
			passwordIsValid.valid &&
			password !== "" &&
			email !== "" 
		) {
			const { status, message: responseMessage } = await signInUser(
				email,
				password
			);

			setMessage({ status, message: responseMessage });

			if (status === "success") {
				setValidationMessages({
					email: "",
					password: "",
					confirmPassword:""
				});
				emailResetHandler();
				passwordResetHandler();
			}
		} else {
			const validationMessage = {
				email:
					emailIsValid.reasons !== undefined
						? parseValidationMessages(emailIsValid.reasons)
						: "",
				password:
					passwordIsValid.reasons !== undefined
						? parseValidationMessages(passwordIsValid.reasons)
						: "",
				confirmPassword:validationMessages.confirmPassword
			};
			setValidationMessages(validationMessage);
		}
	};
	const onEmailBlur = () => {
		setValidationMessages((state) => {
			return {
				...state,
				email:
					emailIsValid.reasons !== undefined
						? parseValidationMessages(emailIsValid.reasons)
						: "",
			};
		});
		emailBlurHandler();
	};
	const onPasswordBlur = () => {
		setValidationMessages((state) => {
			return {
				...state,
				password:
					passwordIsValid.reasons !== undefined
						? parseValidationMessages(passwordIsValid.reasons)
						: "",
			};
		});
		passwordBlurHandler();
	};
	const onConfirmPasswordBlur = () => {
		setValidationMessages((state) => {
			return {
				...state,
				confirmPassword:
					confirmPasswordIsValid.reasons !== undefined
						? parseValidationMessages(
								confirmPasswordIsValid.reasons
						  )
						: "",
			};
		});
		confirmPasswordBlurHandler();
	};
	return (
		<>
			<h2>{isToSignIn?"Sign In":"Sign Up"}</h2>
			<form className={classes[`auth-form`]}>
				<div className={classes[`input-module`]}>
					<section className={classes[`auth-credentials`]}>
						<label htmlFor="auth-email">Email</label>
						<input
							onChange={emailChangeHandler}
							onBlur={onEmailBlur}
							value={email}
							placeholder="Type ..."
							type="text"
							name="auth-email"
							className={
								!emailIsValid.valid
									? classes[`input__error`]
									: ""
							}
						/>
					</section>
					<p className={classes[`input-validation-error`]}>
						{validationMessages.email}
					</p>
				</div>
				<div className={classes[`input-module`]}>
					<section className={classes[`auth-credentials`]}>
						<label htmlFor="auth-password">Password</label>
						<input
							onChange={passwordChangeHandler}
							onBlur={onPasswordBlur}
							value={password}
							placeholder="Type ..."
							type="password"
							name="auth-password"
							className={
								!passwordIsValid.valid
									? classes[`input__error`]
									: ""
							}
						/>
					</section>
					<p className={classes[`input-validation-error`]}>
						{validationMessages.password}
					</p>
				</div>
				{!isToSignIn && (
					<div className={classes[`input-module`]}>
						<section className={classes[`auth-credentials`]}>
							<label htmlFor="auth-confirm-password">
								Confirm password
							</label>
							<input
								onChange={confirmPasswordChangeHandler}
								onBlur={onConfirmPasswordBlur}
								value={confirmPassword}
								placeholder="Type ..."
								type="password"
								name="auth-confirm-password"
								className={
									!confirmPasswordIsValid.valid
										? classes[`input__error`]
										: ""
								}
							/>
						</section>
						<p className={classes[`input-validation-error`]}>
							{validationMessages.confirmPassword}
						</p>
					</div>
				)}
				<button
					onClick={isToSignIn ? handleSignIn : handleSignUp}
					className={classes[`big-button`]}
				>
					{isToSignIn ? "Login" : "Register"}
				</button>
				<p>
					{isToSignIn ? "Not a member?" : "Already signed up?"}
					<span
						className={classes[`sign-in`]}
						onClick={handleSignInMode}
					>
						{isToSignIn ? "Sign Up" : "Sign In"}
					</span>
				</p>
				<p className={classes[`auth-message`]}>
					{(message.status === "success" ||
						message.status === "failure") &&
						message.message}
				</p>
			</form>
		</>
	);
};

export default Auth;
