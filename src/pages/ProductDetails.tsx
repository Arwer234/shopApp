import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Reviews from "../components/Layout/Reviews";
import useFirebase from "../hooks/useFirebase";

import { RootState } from "../store";
import { tShopItem } from "../store/data";

import classes from "./ProductDetails.module.css";

type Props = {};

const ProductDetails = (props: Props) => {
	const params = useParams();
	const { getShopItemsData } = useFirebase();

	const items: tShopItem[] = useSelector(
		(state: RootState) => state.data.shop_items
	);
	const isDataLoaded: boolean = useSelector(
		(state: RootState) => state.data.isDataLoaded
	);
	const item: tShopItem = items.filter((item) => {
		return item.id === parseInt(params.id!);
	})[0];
	useEffect(() => {
		if (!isDataLoaded) {
			getShopItemsData();
		}
	}, []);

	const getItemParamsList = () => {
		let list:JSX.Element[] = []
		for (const [key, value] of Object.entries(item.params)) {
			list.push(<li>{key}:{value}</li>) 
		  }
		return list;
	};

	return (
		<section className={classes[`product-details`]}>
			{isDataLoaded && (
				<div className={classes[`product-details-content`]}>
					<div className={classes[`product-imgs`]}></div>
					<div className={classes[`product-details-info`]}>
						<p className={classes[`product-details-descr`]}></p>
						<ul className={classes[`product-details-params`]}>
							{getItemParamsList()}
						</ul>
					</div>
				</div>
			)}

			<Reviews />
		</section>
	);
};

export default ProductDetails;
