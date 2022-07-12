import React, { useEffect, useState } from "react";
import classes from "./ShopItems.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { tShopItem } from "../../store/data";
import ShopItem from "./ShopItem";

import { RootState, uiActions } from "../../store/index";

import loading from "../../imgs/loading.gif";
import useFirebase from "../../hooks/useFirebase";

type Props = {};

const ShopItems = (props: Props) => {
	const {currentUser, getUserFavouritesData, addUserFavourite, removeUserFavourite} = useFirebase()

	const favouriteItemsIds = useSelector((state:RootState) => state.user.favourites)

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(()=>{
		getUserFavouritesData()
	},[currentUser])

	const isDataLoaded = useSelector(
		(state: RootState) => state.data.isDataLoaded
	);
	const filteredShopItems = useSelector(
		(state: RootState) => state.data.filtered_shop_items
	);

	const handleItemClick = (id: number) => {
		dispatch(uiActions.setSelectedItem(id));
		navigate("/product-details/"+id);
	};
	const handleFavouriteClick = (id:number) =>{
		if(!favouriteItemsIds.includes(id)){
			addUserFavourite(id, favouriteItemsIds)
		}
		else{
			removeUserFavourite(id,favouriteItemsIds)
		}
	}

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
								isUserLoggedIn = {currentUser !== null}
								isFavourite = {favouriteItemsIds.includes(item.id)}
								onFavouriteClick = {handleFavouriteClick}
							/>
						);
					})}
				{!isDataLoaded && <img src={loading} alt="loading..." />}
			</section>
		</section>
	);
};
export default ShopItems;
