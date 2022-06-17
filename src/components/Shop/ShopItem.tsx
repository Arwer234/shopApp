import React from 'react'
import classes from "./ShopItem.module.css"
import home from '../../imgs/product.png'

type Props = {
  id:number,
  title:String,
  desc:String,
  onClick:(id:number)=>void
}

const ShopItem = (props: Props) => {
  const handleClick = (event:React.MouseEvent<HTMLDivElement>) =>{
    props.onClick(props.id)
  }
  return (
    <div onClick = {handleClick} className={classes['shop-item']}>
        <img src = {home} alt = "sample"/>
        
        <section className={classes[`shop-item-content`]}>
            <h2 className={classes[`shop-item-title`]}>{props.title}</h2>
            <p className={classes[`shop-item-description`]}>{props.desc}</p>
        </section>
    </div>
  )
}

export default ShopItem