import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalShown:false,
    selectedItem:0,
}

const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        changeOverlayShown(state){
            state.isModalShown = !state.isModalShown
        },
        setSelectedItem(state,action){
            state.selectedItem = action.payload
        },
    }
})

export default uiSlice