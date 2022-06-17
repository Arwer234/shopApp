import React from 'react'
import classes from './ShopItems.module.css'
import {useDispatch, useSelector} from "react-redux"

import ShopItem from './ShopItem'

import {RootState, uiActions} from "../../store/index"

type Props = {}

const ShopItems = (props: Props) => {
  const dispatch = useDispatch()
  const shop_items = useSelector((state:RootState) => state.data.shop_items)

  const handleItemClick = (id:number) =>{
    dispatch(uiActions.changeOverlayShown())
    dispatch(uiActions.setSelectedItem(id))
  }
  return (
    <section className = {classes[`shop-items`]}>
        <h2>Shop Items</h2>
        <section className={classes[`shop-items-list`]}>
          {shop_items.map(item =>{
            return <ShopItem onClick = {handleItemClick} {...item} key={item.id}/>
          })}
        </section>
    </section>
  )
}
export default ShopItems