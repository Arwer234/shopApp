import React, { ReactNode } from 'react'
import classes from "./Overlay.module.css"

import {useDispatch} from "react-redux"

import {uiActions} from "../../store/index"

type Props = {
    children:ReactNode
}

const Overlay = (props: Props) => {
  const dispatch = useDispatch()
  const handleClick = () =>{
    dispatch(uiActions.changeOverlayShown())
  }
  return (
    <section onClick = {handleClick} className={classes[`overlay`]}>
        {props.children}
    </section>
  )
}

export default Overlay