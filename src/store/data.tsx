import {createSlice} from '@reduxjs/toolkit'

export type tShopItem = {
    id: number,
    title: string,
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
            title: "Sample 1",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 1.55
        },
        {
            id: 1,
            title: "Sample 2",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 2.55
        },
        {
            id: 2,
            title: "Sample 3",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 3.55
        },
        {
            id: 3,
            title: "Sample 4",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 4.55
        }, {
            id: 4,
            title: "Sample 5",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 5.55
        }, {
            id: 5,
            title: "Sample 6",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 6.55
        }, {
            id: 6,
            title: "Sample 7",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 7.55
        }, {
            id: 7,
            title: "Sample 8",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 5.55
        },
    ],
    filtered_shop_items: [
        {
            id: 0,
            title: "Sample 1",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 1.55
        },
        {
            id: 1,
            title: "Sample 2",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 2.55
        },
        {
            id: 2,
            title: "Sample 3",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 3.55
        },
        {
            id: 3,
            title: "Sample 4",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 4.55
        }, {
            id: 4,
            title: "Sample 5",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 5.55
        }, {
            id: 5,
            title: "Sample 6",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 6.55
        }, {
            id: 6,
            title: "Sample 7",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 7.55
        }, {
            id: 7,
            title: "Sample 8",
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
    if (filters.name !== "" && !item.title.includes(filters.name)) 
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
        }
    }
});

export default dataSlice
