import "../scss/style.scss";
import "swiper/css";

import Swiper, { Navigation, Autoplay, Keyboard, EffectCreative } from "swiper";
import { HeroSlider } from "./components/HeroSlider";
import { LinkDirectionAwareHoverEffect } from "./components/LinkDirectionAwareHoverEffect";
import { VideoPlayer } from "./components/VideoPlayer";
import { CustomCheckbox } from "./components/CustomCheckbox";

Swiper.use([Navigation, Autoplay, Keyboard, EffectCreative]);

window.addEventListener("DOMContentLoaded", () => {
	const mainNavigationLinkDirectionAwareHoverEffect = new LinkDirectionAwareHoverEffect({
		linksSelector: ".main-navigation__navigation-link",
		underlineColor: "hsl(177deg, 100%, 39%)"
	});

	const customCheckbox = new CustomCheckbox({
		checkboxSelector: "feedback-agreement",
		svgSelector: ".custom-checkbox__svg-label",
		reverseAnimationClassName: "custom-checkbox__reverse-animation"
	});

	mainNavigationLinkDirectionAwareHoverEffect.init();
	customCheckbox.init();
});

window.addEventListener("load", () => {
	const heroSlider = new Swiper(".hero-slider", HeroSlider);
	const videoPlayer = new VideoPlayer({
		triggerSelector: ".video__play-button",
		posterSelector: ".video__preview-image",
		playerSelector: ".video__clip"
	});

	heroSlider.init();
	videoPlayer.init();
});
