import React, { useEffect, useState } from "react";
import classes from "./ShopItems.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { tShopItem } from "../../store/data";
import ShopItem from "./ShopItem";

import { RootState, uiActions } from "../../store/index";

import loading from "../../imgs/loading.gif";

type Props = {};

const ShopItems = (props: Props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isDataLoaded = useSelector(
		(state: RootState) => state.data.isDataLoaded
	);
	const filteredShopItems = useSelector(
		(state: RootState) => state.data.filtered_shop_items
	);

	const handleItemClick = (id: number) => {
		dispatch(uiActions.setSelectedItem(id));
		navigate("/product-details");
	};

	return (
		<section className={classes[`shop-items`]}>
			<h2>Shop Items</h2>
			<section className={classes[`shop-items-list`]}>
				{isDataLoaded &&
					filteredShopItems.map((item: tShopItem) => {
						return (
							<ShopItem
								onClick={handleItemClick}
								{...item}
								key={item.id}
							/>
						);
					})}
				{!isDataLoaded && <img src={loading} alt="loading..." />}
			</section>
		</section>
	);
};
export default ShopItems;
