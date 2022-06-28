import React, { useEffect, useState } from 'react'
import classes from './ShopItems.module.css'
import {useDispatch, useSelector} from "react-redux"

import { tShopItem } from '../../store/data'
import ShopItem from './ShopItem'

import {RootState, uiActions} from "../../store/index"

type Props = {}



const ShopItems = (props: Props) => {
  const dispatch = useDispatch()
  const filteredShopItems = useSelector((state:RootState) => state.data.filtered_shop_items)

  console.log(filteredShopItems)

  const handleItemClick = (id:number) =>{
    //dispatch(uiActions.changeOverlayShown())
    dispatch(uiActions.setSelectedItem(id))
  }
  
  return (
    <section className = {classes[`shop-items`]}>
        <h2>Shop Items</h2>
        <section className={classes[`shop-items-list`]}>
          {filteredShopItems.map((item:tShopItem) =>{
            return <ShopItem onClick = {handleItemClick} {...item} key={item.id}/>
          })}
        </section>
    </section>
  )
}
export default ShopItems