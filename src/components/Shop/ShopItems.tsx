import React from 'react'
import ShopItem from './ShopItem'
import classes from './ShopItems.module.css'

type Props = {}

const ShopItems = (props: Props) => {
  return (
    <section className = {classes.shopItems}>
        <h2>Shop Items</h2>
        <section className={classes[`shop-items-list`]}>
          <ShopItem/>
          <ShopItem/>
          <ShopItem/>
          <ShopItem/>
          <ShopItem/>
          <ShopItem/>
        </section>
    </section>
  )
}
export default ShopItems