import React from 'react'
import Overlay from './Overlay'
import classes from "./Modal.module.css"

type Props = {
  children?:React.ReactElement
}

const Modal = (props: Props) => {
  //const selectedItemId:number = useSelector((state:RootState) => state.ui.selectedItem)
  //const item = useSelector((state:RootState) => state.data.shop_items[selectedItemId])

  const handleClick = (event:React.MouseEvent) =>{
    event.stopPropagation()
  }
  return (
    <Overlay>
        <section onClick={handleClick} className={classes[`modal`]}>
            {props.children}
        </section>
    </Overlay>
  )
}

export default Modal