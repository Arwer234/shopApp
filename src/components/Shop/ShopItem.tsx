import React from 'react'
import classes from "./ShopItem.module.css"
import home from '../../imgs/product.png'

type Props = {}

const ShopItem = (props: Props) => {
  return (
    <div className={classes['shop-item']}>
        <img src = {home} alt = "sample"/>
        
        <section className={classes[`shop-item-content`]}>
            <h2 className={classes[`shop-item-title`]}>Title</h2>
            <p className={classes[`shop-item-description`]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </section>
    </div>
  )
}

export default ShopItem