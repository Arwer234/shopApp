import { createSlice } from "@reduxjs/toolkit";

const initialState:{favourites:number[], cart:[]} = { //TODO: cart type
    favourites:[],
    cart:[]
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
        setCart(state,action){
            state.cart = action.payload
        },
        setFavourites(state,action){
            state.favourites=action.payload
        }
    },
});

export default userSlice;
