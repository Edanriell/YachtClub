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


	const animateTickMark = gsap.timeline({ paused: true });
const animateCheckBox = gsap.timeline({ paused: true, yoyo: true });

let toggle = true;

animateTickMark
  .set(".checkbox", { border: "2px solid #3F71FF" })
  .to(".fill-color", 0.1, {
    webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  })
  .to(".tick-mark-1", 0.1, { webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" })
  .to(".tick-mark-2", 0.1, { webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });

animateCheckBox
  .to(".checkbox", 0.1, { rotate: 10 }, 0.2)
  .to(".checkbox", 0.1, { rotate: 0 }, 0.3)
  .to(".line-1", 0.1, { width: 15 }, 0.3)
  .to(".line-2", 0.1, { width: 15 }, 0.3)
  .to(".line-3", 0.1, { width: 15 }, 0.3)
  .to(".line-4", 0.1, { width: 15 }, 0.3)
  .set(".line-1", { width: 0 })
  .set(".line-2", { width: 0 })
  .set(".line-3", { width: 0 })
  .set(".line-4", { width: 0 })

  const checkbox = document.querySelector(".checkbox");

  checkbox?.addEventListener("click", () => {
	console.log(checkbox);
	if(toggle){
		animateTickMark.restart();
		animateCheckBox.restart();
	   } else {
		animateTickMark.reverse();
	   }
	   toggle = !toggle;
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
