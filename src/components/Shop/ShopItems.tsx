import React from 'react'
import ShopItem from './ShopItem'
import classes from './ShopItems.module.css'

type Props = {}

const DUMMY_DATA:{id:number, title:String, desc:String}[] = [
  {id:0, title:"Sample 1", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
  {id:1, title:"Sample 2", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
  {id:2, title:"Sample 3", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
  {id:3, title:"Sample 4", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
  {id:4, title:"Sample 5", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
  {id:5, title:"Sample 6", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
  {id:6, title:"Sample 7", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
  {id:7, title:"Sample 8", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
]
const handleItemClick = (id:number) =>{
  console.log(id)
}

const ShopItems = (props: Props) => {
  return (
    <section className = {classes[`shop-items`]}>
        <h2>Shop Items</h2>
        <section className={classes[`shop-items-list`]}>
          {DUMMY_DATA.map(item =>{
            return <ShopItem onClick = {handleItemClick} {...item} key={item.id}/>
          })}
        </section>
    </section>
  )
}
export default ShopItems