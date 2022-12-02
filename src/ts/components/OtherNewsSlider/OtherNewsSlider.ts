import { SwiperOptions } from "swiper";

export const OtherNewsSlider: SwiperOptions = {
	slidesPerView: 4,
	loop: true,
	autoplay: {
		delay: 10000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true
	},
	keyboard: {
		enabled: true
	},
	grabCursor: true,
	spaceBetween: 30,
	mousewheel: true,
	speed: 600
};
