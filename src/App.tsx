import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";

import classes from "./App.module.css";

import Header from "./components/Layout/Header";
import Navbar from "./components/Layout/Navbar";
import Modal from "./components/UI/Modal";
import Auth from "./components/User/Auth";

import { RootState } from "./store/index";

import Landing from "./pages/Landing";
import ProductDetails from "./pages/ProductDetails";

import useFirebase from "./hooks/useFirebase";

function App() {
	const isModalShown = useSelector(
		(state: RootState) => state.ui.isModalShown
	);
	const isDataLoaded = useSelector(
		(state: RootState) => state.data.isDataLoaded
	);
	const { getData, currentUser, signOutUser } = useFirebase();

	useEffect(() => {
		if (!isDataLoaded) getData();
	}, []);

	return (
		<div className={classes[`main`]}>
			{isModalShown && (
				<Modal>
					<Auth />
				</Modal>
			)}
			<Header
				isUserLoggedIn={currentUser !== null}
				onSignOutUser={signOutUser}
			/>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/product-details/:id"
					element={<ProductDetails />}
				/>
			</Routes>
			<footer className={classes[`footer`]}>
				<p>© 2022 Jakub Filipowski</p>
				<p>Test data</p>
			</footer>
		</div>
	);
}

export default App;
