import "../scss/style.scss";
import "swiper/css";

import gsap from "gsap";

import Swiper, { Navigation, Autoplay, Keyboard, EffectCreative } from "swiper";
import { HeroSlider } from "./components/HeroSlider";
import { LinkDirectionAwareHoverEffect } from "./components/LinkDirectionAwareHoverEffect";
import { VideoPlayer } from "./components/VideoPlayer";

Swiper.use([Navigation, Autoplay, Keyboard, EffectCreative]);

window.addEventListener("DOMContentLoaded", () => {
	const mainNavigationLinkDirectionAwareHoverEffect = new LinkDirectionAwareHoverEffect({
		linksSelector: ".main-navigation__navigation-link",
		underlineColor: "hsl(177deg, 100%, 39%)"
	});

	mainNavigationLinkDirectionAwareHoverEffect.init();

	    
	let checkbox = document.getElementById('cb');
	let svg = document.getElementById('checkbox');

	svg?.addEventListener('click', () => {
		if((checkbox as HTMLInputElement).checked)
			svg?.classList.add('reverse')
		else 
			svg?.classList.remove('reverse')
	})

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
