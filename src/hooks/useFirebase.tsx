import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
	collection,
	onSnapshot,
	getFirestore,
	updateDoc,
	setDoc,
	doc,
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

import { dataActions, userActions } from "../store/index";
import appConfig from "../settings/app";

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

	const getShopItemsData = () => {
		if (appConfig.canFetchData) {
			onSnapshot(collection(database, "shop_items"), (snapshot) => {
				dispatch(
					dataActions.setShopItems(
						snapshot.docs.map((doc) => doc.data())
					)
				);
			});
		} else console.log("App config is set to restrict fetching!");
	};
	const getUserFavouritesData = () => {
		if (currentUser !== null) {
			onSnapshot(collection(database, "user_favourites"), (snapshot) => {
				const usersData = snapshot.docs.map((doc) => doc.data());
				const specificUserData = usersData.filter((item) => {
					return item.user_id === currentUser.uid;
				})[0];
				dispatch(userActions.setFavourites(specificUserData.item_ids));
			});
		} else console.log("There is no user signed in!"); // TODO: print more informative prompt
	};
	const addUserFavourite = async (id: number, prevItems:number[]) => {
		const ref = doc(database, "user_favourites", currentUser!.uid);
		await updateDoc(ref, {
			item_ids:[...prevItems,id]
		});
		console.log("added!")
	};
	const removeUserFavourite = async(id:number, prevItems:number[]) =>{
		const ref = doc(database, "user_favourites", currentUser!.uid);
		const newArray = prevItems.filter(item => item !== id)
		await updateDoc(ref, {
			item_ids:newArray
		});
		console.log("removed!")
	}
	const signUpUser = async (email: string, password: string) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			setCurrentUser(userCredential.user);

			await setDoc(
				doc(database, "user_favourites", userCredential.user.uid),
				{
					user_id: userCredential.user.uid,
					item_ids: [],
				}
			);

			await setDoc(doc(database, "user_cart", userCredential.user.uid), {
				user_id: userCredential.user.uid,
				item_ids: [],
			});

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

	return {
		getShopItemsData,
		signUpUser,
		signOutUser,
		currentUser,
		signInUser,
		getUserFavouritesData,
		addUserFavourite,
		removeUserFavourite
	};
};

export default useFirebase;
