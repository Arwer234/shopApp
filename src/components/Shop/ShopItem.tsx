import React from 'react'
import classes from "./ShopItem.module.css"

type Props = {
  id:number,
  name:String,
  desc:String,
  price:number,
  img:string,
  onClick:(id:number)=>void
}

const ShopItem = (props: Props) => {
  const handleClick = (event:React.MouseEvent<HTMLDivElement>) =>{
    props.onClick(props.id)
  }
  const isImgLinkValid = (link:string) =>{
    let res = true;
    if(link.length <= 0 || link.length>25 || link.includes("C:")) res = false
    return res
  }
  return (
    <div onClick = {handleClick} className={classes['shop-item']}>
        <img className = {classes[`shop-item-img`]} src = {isImgLinkValid(props.img)?require("../../imgs/"+props.img):""} alt = "sample"/>
        
        <section className={classes[`shop-item-content`]}>
            <h2 className={classes[`shop-item-name`]}>{props.name}</h2>
            <p className={classes[`shop-item-description`]}>{props.desc}</p>
            <p className = {classes[`shop-item-description`]}>Price: {props.price}</p>
        </section>
    </div>
  )
}

export default ShopItem