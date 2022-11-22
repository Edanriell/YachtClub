import { SwiperOptions } from "swiper";

export const HeroSlider: SwiperOptions = {
	slidesPerView: 1,
	loop: true,
	effect: "creative",
	creativeEffect: {
		prev: {
			shadow: true,
			translate: ["-20%", 0, -1]
		},
		next: {
			translate: ["100%", 0, 0]
		}
	},
	autoplay: {
		delay: 60000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true
	},
	keyboard: {
		enabled: true
	},
	navigation: {
		nextEl: ".hero-slider__button-next",
		prevEl: ".hero-slider__button-prev"
	},
	grabCursor: true,
	speed: 600
};
