import {initializeApp} from "firebase/app";
import { collection , onSnapshot, getFirestore, query, orderBy } from 'firebase/firestore';
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import { useDispatch } from "react-redux";

import firebaseConfig from '../settings/firebase'

import {dataActions} from "../store/index"

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message
    return String(error)
}
const parseErrorMessage = (message:string) => {
    if(message.includes("email-already-in-use")) return {status:"failure", message:"This email is already in use!"}
    else return {status:"failure", message}
}

const useFirebase = () => {
    const dispatch = useDispatch()
    const app = initializeApp(firebaseConfig)
    const database = getFirestore(app)
    const auth = getAuth(app)

    const getData = () =>{
        //const q = query(collection(database,"shop_items"),orderBy('timestamp','desc'))
        onSnapshot(collection(database,'shop_items'),(snapshot)=>{
            dispatch(dataActions.setShopItems(snapshot.docs.map(doc => doc.data())))
        })
    }
    const registerUser = async(email:string, password:string) =>{
        try{
            const user = await createUserWithEmailAndPassword(auth,email,password)
            return {status:"success", message:"Your account has been successfully created!"}
        } catch(error){
            let message = getErrorMessage(error)
            return parseErrorMessage(message)
            
            
        }
        
    }

    return {getData, registerUser}
}

export default useFirebase
