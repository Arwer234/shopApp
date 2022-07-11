import { createSlice } from "@reduxjs/toolkit";

export type tShopItem = {
	id: number;
	name: string;
	desc: string;
	price: number;
	img: string;
	long_desc:string;
	params:Map<string,string>;
};

type tFilters = {
	name: string;
	priceFrom: number;
	priceTo: number;
};

const initialState = {
	isDataLoaded: false,
	shop_items: [],
	filtered_shop_items: [],
	selected_shop_item:{},
	filters: {
		name: "",
		priceFrom: 0,
		priceTo: 999,
	},
};

const isItemValid = (item: tShopItem, filters: tFilters) => {
	if (filters.name !== "" && !item.name.includes(filters.name)) return false;
	if (item.price < filters.priceFrom) return false;
	if (item.price > filters.priceTo) return false;
	return true;
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setFilters(state, action) {
			state.filters = action.payload;
			state.filtered_shop_items = state.shop_items.filter(
				(item: tShopItem) => {
					return isItemValid(item, state.filters);
				}
			);
		},
		setShopItems(state, action) {
			state.shop_items = action.payload;
			state.isDataLoaded = true;
			state.filtered_shop_items = action.payload.filter(
				(item: tShopItem) => {
					return isItemValid(item, state.filters);
				}
			);
		},
	},
});

export default dataSlice;
