import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";

import classes from "./App.module.css";

import Header from "./components/Layout/Header";
import Navbar from "./components/Layout/Navbar";
import Modal from "./components/UI/Modal";
import Login from "./components/User/Login";
import Register from "./components/User/Register";

import { RootState } from "./store/index";

import Landing from "./pages/Landing";
import ProductDetails from "./pages/ProductDetails";

import appConfig from "./settings/app";

import useFirebase from "./hooks/useFirebase";

function App() {
	const [isLoggingIn, setIsLoggingIn] = useState(true);

	const isModalShown = useSelector(
		(state: RootState) => state.ui.isModalShown
	);
	const { getData, currentUser, signOutUser} = useFirebase();

	useEffect(() => {
		if (appConfig.canFetchData) getData();
	}, []);

	const handleUserSigning = () => {
		setIsLoggingIn((state) => {
			return !state;
		});
	};

	return (
		<div className={classes[`main`]}>
			{isModalShown && (
				<Modal>
					{isLoggingIn ? (
						<Login onSwitch={handleUserSigning} />
					) : (
						<Register onSwitch={handleUserSigning} />
					)}
				</Modal>
			)}
			<Header isUserLoggedIn = {currentUser !== null} onSignOutUser = {signOutUser} />
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/product-details" element={<ProductDetails />} />
			</Routes>
			<footer className={classes[`footer`]}>
				<p>© 2022 Jakub Filipowski</p>
				<p>Test data</p>
			</footer>
		</div>
	);
}

export default App;
