import React from "react";
import logo from "../../imgs/building-128.png";
import loginImg from "../../imgs/icons8-person-64.png";
import cartImg from "../../imgs/cart-64-64.png";

import classes from "./Header.module.css";
import { useDispatch } from "react-redux";

import { uiActions } from "../../store/index";

type Props = {
	isUserLoggedIn: boolean;
	onSignOutUser: () => void;
};

const Header = (props: Props) => {
	const dispatch = useDispatch();

	const handleLoginClick = () => {
		dispatch(uiActions.changeOverlayShown());
	};
	const handleLogoutClick = () => {
		props.onSignOutUser();
	};
	const handleCartClick = () => {};
	return (
		<header className={classes.header}>
			<h1 className={classes.title}>Shop App</h1>
			<img className={classes.logo} src={logo} alt="Logo" />
			<div className={classes[`header-controls`]}>
				<div
					onClick={
						props.isUserLoggedIn
							? handleLogoutClick
							: handleLoginClick
					}
					className={classes[`header-login`]}
				>
					<img
						className={classes[`header-login-img`]}
						src={loginImg}
					/>
					<p className={classes[`header-login-desc`]}>
						{props.isUserLoggedIn ? "Logout" : "Login"}
					</p>
				</div>

				<div
					onClick={handleCartClick}
					className={classes[`header-cart`]}
				>
					<img className={classes[`header-cart-img`]} src={cartImg} />
					<p className={classes[`header-cart-desc`]}>Cart</p>
				</div>
			</div>
		</header>
	);
};
export default Header;
