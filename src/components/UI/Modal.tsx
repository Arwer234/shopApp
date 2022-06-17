import React from 'react'
import Overlay from './Overlay'
import classes from "./Modal.module.css"
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

type Props = {}

const Modal = (props: Props) => {
  const selectedItemId:number = useSelector((state:RootState) => state.ui.selectedItem)
  const item = useSelector((state:RootState) => state.data.shop_items[selectedItemId])

  const handleClick = (event:React.MouseEvent) =>{
    event.stopPropagation()
  }
  return (
    <Overlay>
        <section onClick={handleClick} className={classes[`modal`]}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
        </section>
    </Overlay>
  )
}

export default Modal