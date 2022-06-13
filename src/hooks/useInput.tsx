import React, { ReactEventHandler, useReducer } from 'react'

const initialState = {
    value:"",
    isTouched:false
}
const inputReducer = (state:{value:string,isTouched:boolean},action:{type:string,value:string})=>{
    switch(action.type){
        case "INPUT":
            return {value:action.value, isTouched:true}
        case "BLUR":
            return {value:state.value, isTouched:state.isTouched}
        case "RESET":
            return {value:"",isTouched:false}
    }   
    return {value:"",isTouched:false}
}
const useInput = (validateValue:(input:string)=>boolean) => {
    const [inputState,dispatch] = useReducer(inputReducer,initialState);
    const valueIsValid = validateValue(inputState.value)

    const valueChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
        if(validateValue(event.target.value) || event.target.value == ''){
            dispatch({
                type:"INPUT",
                value:event.target.value
            })
        }
        
    }
    const blurHandler = () =>{
        dispatch({
            type: "BLUR",
            value: ''
        })
    }
    const resetHandler = () =>{
        dispatch({
            type: "RESET",
            value: ''
        })
    }
    return {
        value:inputState.value,
        valueChangeHandler,
        blurHandler,
        resetHandler,
        valueIsValid
    }
}

export default useInput