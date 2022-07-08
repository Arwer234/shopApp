import { useState } from "react";
import firebase, { initializeApp } from "firebase/app";
import {
	collection,
	onSnapshot,
	getFirestore,
	query,
	orderBy,
} from "firebase/firestore";
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
		console.log(currentUser);
		if (
			authStateUserId !== currentUserID ||
			(currentUser === null && authStateUser !== null)
		) {
			setCurrentUser(authStateUser);
		}
	});

	const getData = () => {
		//const q = query(collection(database,"shop_items"),orderBy('timestamp','desc'))
		onSnapshot(collection(database, "shop_items"), (snapshot) => {
			dispatch(
				dataActions.setShopItems(snapshot.docs.map((doc) => doc.data()))
			);
		});
	};
	const registerUser = async (email: string, password: string) => {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("USer:");
			console.log(user);
			return {
				status: "success",
				message: "Your account has been successfully created!",
			};
		} catch (error) {
			let message = getErrorMessage(error);
			return parseErrorMessage(message);
		}
	};
	const signInUser = (email:string,password:string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = setCurrentUser(userCredential.user)
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
	const signOutUser = () => {
		auth.signOut();
		setCurrentUser(null)
	};

	return { getData, registerUser, signOutUser, currentUser };
};

export default useFirebase;
