import "../scss/style.scss";
import "swiper/css";

import SuccessIcon from "../images/icons/circle-check-solid.svg";
import FailureIcon from "../images/icons/circle-exclamation-solid.svg";

import Swiper, { Navigation, Autoplay, Keyboard, EffectCreative } from "swiper";
import { HeroSlider } from "./components/HeroSlider";
import { LinkDirectionAwareHoverEffect } from "./components/LinkDirectionAwareHoverEffect";
import { VideoPlayer } from "./components/VideoPlayer";
import { CustomCheckbox } from "./components/CustomCheckbox";
import { Forms } from "./components/Forms";
import { FormValidation } from "./components/FormValidation";

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
		inputs: [
			{
				uniqueName: "name",
				selector: "[data-event-participant-registration-form-name-input]",
				testRegExp:
					// eslint-disable-next-line max-len
					/^[a-zа-яё\s]+$/iu,
				style: {
					valid: `
						border: 0.1rem solid darkgreen;
					`,
					invalid: `
						border: 0.1rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверное имя",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						bottom: 0;
						right: 0;
						z-index: 4;
						font-family: var(--ff-normal-400);
					`
				},
				inputStateIcon: {
					validInputIcon: SuccessIcon,
					invalidInputIcon: FailureIcon,
					iconWidth: 30,
					iconHeight: 30
				}
			},
			{
				uniqueName: "phoneNumber",
				selector: "[data-event-participant-registration-form-phone-input]",
				testRegExp:
					// eslint-disable-next-line max-len
					/^(\+)\d+$/,
				style: {
					valid: `
						border: 0.1rem solid darkgreen;
					`,
					invalid: `
						border: 0.1rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверный номер телефона",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						bottom: 0;
						right: 0;
						z-index: 4;
						font-family: var(--ff-normal-400);
					`
				},
				inputStateIcon: {
					validInputIcon: SuccessIcon,
					invalidInputIcon: FailureIcon,
					iconWidth: 30,
					iconHeight: 30
				}
			},
			{
				uniqueName: "email",
				selector: "[data-event-participant-registration-form-email-input]",
				testRegExp:
					// eslint-disable-next-line max-len
					/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
				style: {
					valid: `
						border: 0.1rem solid darkgreen;
					`,
					invalid: `
						border: 0.1rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверный адрес электронной почты",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						bottom: 1rem;
						right: 0;
						z-index: 4;
						font-family: var(--ff-normal-400);
					`
				},
				inputStateIcon: {
					validInputIcon: SuccessIcon,
					invalidInputIcon: FailureIcon,
					iconWidth: 30,
					iconHeight: 30
				}
			}
		],
		initialInputStyle: `
			border: 0.1rem solid var(--clr-primary-nileBlueHalfTransparent);
		`,
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
