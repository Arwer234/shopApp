import React, { ReactNode } from 'react'
import classes from "./Overlay.module.css"

type Props = {
    children:ReactNode
}

const Overlay = (props: Props) => {
  return (
    <section className={classes[`overlay`]}>
        {props.children}
    </section>
  )
}

export default Overlay