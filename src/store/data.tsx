import {createSlice} from '@reduxjs/toolkit'

export type tShopItem = {
    id: number,
    name: string,
    desc: string,
    price: number
}

type tFilters = {
    name: string,
    priceFrom: number,
    priceTo: number
}

const initialState = {
    shop_items: [
        {
            id: 0,
            name: "Sample 1",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 1.55
        },
        {
            id: 1,
            name: "Sample 2",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 2.55
        },
        {
            id: 2,
            name: "Sample 3",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 3.55
        },
        {
            id: 3,
            name: "Sample 4",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 4.55
        }, {
            id: 4,
            name: "Sample 5",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 5.55
        }, {
            id: 5,
            name: "Sample 6",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 6.55
        }, {
            id: 6,
            name: "Sample 7",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 7.55
        }, {
            id: 7,
            name: "Sample 8",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 5.55
        },
    ],
    filtered_shop_items: [
        {
            id: 0,
            name: "Sample 1",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 1.55
        },
        {
            id: 1,
            name: "Sample 2",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 2.55
        },
        {
            id: 2,
            name: "Sample 3",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 3.55
        },
        {
            id: 3,
            name: "Sample 4",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 4.55
        }, {
            id: 4,
            name: "Sample 5",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 5.55
        }, {
            id: 5,
            name: "Sample 6",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 6.55
        }, {
            id: 6,
            name: "Sample 7",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 7.55
        }, {
            id: 7,
            name: "Sample 8",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 5.55
        }
    ],
    filters: {
        name: "",
        priceFrom: 0,
        priceTo: 999
    }
}

const isItemValid = (item : tShopItem, filters : tFilters) => {
    if (filters.name !== "" && !item.name.includes(filters.name)) 
      return false
    if (item.price < filters.priceFrom) 
      return false
    if(item.price > filters.priceTo) 
      return false
    return true
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload
            state.filtered_shop_items = state.shop_items.filter((item : tShopItem) => {
                return isItemValid(item, state.filters)
            })
        },
        setShopItems(state,action){
            state.shop_items = action.payload
            state.filtered_shop_items = action.payload.filter((item : tShopItem) => {
                return isItemValid(item, state.filters)
            })
        }
    }
});

export default dataSlice
