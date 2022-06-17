import {configureStore} from "@reduxjs/toolkit"

import uiSlice from "./ui"
import dataSlice from "./data"


const store = configureStore({
    reducer:{
        ui:uiSlice.reducer,
        data:dataSlice.reducer
    }
})

export const uiActions = uiSlice.actions
export const dataActions = dataSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store