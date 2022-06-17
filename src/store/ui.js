import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOverlayShown:false
}

const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        changeOverlayShown(state){
            state.isOverlayShown = !state.isOverlayShown
        }
    }
})

export default uiSlice