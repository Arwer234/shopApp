import {initializeApp} from "firebase/app";
import { collection , onSnapshot, serverTimestamp, addDoc, getFirestore, query, orderBy } from 'firebase/firestore';
import { useDispatch } from "react-redux";

import firebaseConfig from '../settings/firebase'

import {dataActions} from "../store/index"

const useFirebase = () => {
    const dispatch = useDispatch()
    const app = initializeApp(firebaseConfig)
    const database = getFirestore(app)

    const getData = () =>{
        //const q = query(collection(database,"shop_items"),orderBy('timestamp','desc'))
        onSnapshot(collection(database,'shop_items'),(snapshot)=>{
            dispatch(dataActions.setShopItems(snapshot.docs.map(doc => doc.data())))
        })
    }

    return {getData}
}

export default useFirebase
