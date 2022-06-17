import React from 'react'
import Overlay from './Overlay'
import classes from "./Modal.module.css"

type Props = {}

const Modal = (props: Props) => {
  return (
    <Overlay>
        <section className={classes[`modal`]}>
            
        </section>
    </Overlay>
  )
}

export default Modal