import React from 'react'
import classes from "./Landing.module.css"

import Filters from '../components/Layout/Filters'
import ShopItems from "../components/Shop/ShopItems"

type Props = {}

const Landing = (props: Props) => {
  return (
    <main className={classes[`shop-content`]}>
        <Filters/>
        <ShopItems/>
    </main>
  )
}

export default Landing