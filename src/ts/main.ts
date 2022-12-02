import "../scss/style.scss";
import "swiper/css";

import Swiper, { Navigation, Autoplay, Keyboard, EffectCreative } from "swiper";
import { HeroSlider } from "./components/HeroSlider";
import { LinkDirectionAwareHoverEffect } from "./components/LinkDirectionAwareHoverEffect";
import { VideoPlayer } from "./components/VideoPlayer";
import { CustomCheckbox } from "./components/CustomCheckbox";
import { Forms } from "./components/Forms";
import { FormValidation } from "./components/FormValidation";
import {
	formValidationInputsOptions,
	formValidationInitialInputStyles
} from "./components/FormValidation/FormValidationOptions";

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

	const eventParticipantRegistrationForm = new Forms({
		formSelector: "[data-event-participant-registration-form]",
		submitButtonSelector: "[data-event-participant-registration-form-submit-button]",
		databaseName: "eventParticipants"
	});

	const eventParticipantRegistrationFormValidation = new FormValidation({
		form: "[data-event-participant-registration-form]",
		inputs: formValidationInputsOptions,
		initialInputStyle: formValidationInitialInputStyles,
		submitButton: "[data-event-participant-registration-form-submit-button]"
	});

	mainNavigationLinkDirectionAwareHoverEffect.init();
	customCheckbox.init();
	eventParticipantRegistrationForm.init();
	eventParticipantRegistrationFormValidation.init();
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
