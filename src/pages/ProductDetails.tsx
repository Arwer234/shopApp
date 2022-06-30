import React from 'react'
import { useSelector } from 'react-redux'

import Reviews from '../components/Layout/Reviews'
import { RootState } from '../store'
import { tShopItem } from '../store/data'

import classes from "./ProductDetails.module.css"

type Props = {}

const ProductDetails = (props : Props) => {
    const itemId:number = useSelector((state:RootState) => state.ui.selectedItem)
    const items:tShopItem[] = useSelector((state:RootState)=>state.data.shop_items)
    const item:tShopItem = items.filter(item =>{return item.id === itemId})[0]
    
    console.log(item)

    return (
        <section className={classes[`product-details`]}>
            <div className={classes[`product-details-content`]}>
                <div className={classes[`product-imgs`]}>

                </div>
                <div className={classes[`product-details-info`]}>
                    <h2>{item.name}</h2>
                    <p className={classes[`product-details-descr`]}>

                    </p>
                    <p className={classes[`product-details-params`]}></p>
                </div>
            </div>
            <Reviews/>
        </section>
    )
}

export default ProductDetails
