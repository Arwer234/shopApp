import React from "react";
import classes from "./Landing.module.css";

import Filters from "../components/Layout/Filters";
import ShopItems from "../components/Shop/ShopItems";

import { Pagination, Autoplay} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import sliderImg from "../imgs/slider-test-img.jpg";

type Props = {};

const Landing = (props: Props) => {
	return (
		<div className={classes[`shop-body`]}>
			<Swiper
				pagination={{ type: "progressbar" }}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, Pagination]}
				className={classes[`swiper`]}
			>
				<SwiperSlide className={classes[`swiper-slide`]}>
					<img src={sliderImg} alt="a" />
				</SwiperSlide>
				<SwiperSlide className={classes[`swiper-slide`]}>
					<img src={sliderImg} alt="a" />
				</SwiperSlide>
				<SwiperSlide className={classes[`swiper-slide`]}>
					<img src={sliderImg} alt="a" />
				</SwiperSlide>
			</Swiper>
			<main className={classes[`shop-body__content`]}>
				<Filters />
				<ShopItems />
			</main>
		</div>
	);
};

export default Landing;
