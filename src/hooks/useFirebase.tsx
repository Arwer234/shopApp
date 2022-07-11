import { useState } from "react";
import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	User as FirebaseUser,
} from "firebase/auth";

import { useDispatch } from "react-redux";

import firebaseConfig from "../settings/firebase";

import { dataActions } from "../store/index";

const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) return error.message;
	return String(error);
};
const parseErrorMessage = (message: string) => {
	if (message.includes("email-already-in-use"))
		return { status: "failure", message: "This email is already in use!" };
	else return { status: "failure", message };
};

const useFirebase = () => {
	const dispatch = useDispatch();
	const app = initializeApp(firebaseConfig);
	const database = getFirestore(app);
	const auth = getAuth(app);

	const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

	onAuthStateChanged(auth, async (authStateUser: FirebaseUser | null) => {
		const authStateUserId = await authStateUser?.getIdToken();
		const currentUserID = await currentUser?.getIdToken();
		if (
			authStateUserId !== currentUserID ||
			(currentUser === null && authStateUser !== null)
		) {
			setCurrentUser(authStateUser);
		}
	});

	const getData = () => {
		onSnapshot(collection(database, "shop_items"), (snapshot) => {
			dispatch(
				dataActions.setShopItems(snapshot.docs.map((doc) => doc.data()))
			);
		});
	};
	const signUpUser = async (email: string, password: string) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			setCurrentUser(userCredential.user);
			return {
				status: "success",
				message: "Your account has been successfully created!",
			};
		} catch (error) {
			let message = getErrorMessage(error);
			return parseErrorMessage(message);
		}
	};
	const signInUser = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			setCurrentUser(userCredential.user);
			return {
				status: "success",
				message: "You have been successfully signed in!",
			};
		} catch (error) {
			let message = getErrorMessage(error);
			return parseErrorMessage(message);
		}
	};
	const signOutUser = () => {
		auth.signOut();
		setCurrentUser(null);
	};

	return { getData, signUpUser, signOutUser, currentUser, signInUser};
};

export default useFirebase;
