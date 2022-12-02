import { Input } from "./FormValidation";

import SuccessIcon from "../../../images/icons/circle-check-solid.svg";
import FailureIcon from "../../../images/icons/circle-exclamation-solid.svg";

export const formValidationInputsOptions: Input = [
	{
		uniqueName: "name",
		selector: "[data-event-participant-registration-form-name-input]",
		testRegExp:
			// eslint-disable-next-line max-len
			/^[a-zа-яё\s]+$/iu,
		style: {
			valid: `
				border: 0.1rem solid #198754;
			`,
			invalid: `
				border: 0.1rem solid #dc3545;
			`
		},
		errorMessage: {
			messageText: "Неверное имя",
			messageStyle: `
				color: #dc3545;
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
			iconStyles: `
				width: 30px;
				height: 30px;
				position: absolute;
				top: 50%;
				right: -10%;
				transform: translateY(-30%);
				object-fit: cover;
			`
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
				border: 0.1rem solid #198754;
			`,
			invalid: `
				border: 0.1rem solid #dc3545;
			`
		},
		errorMessage: {
			messageText: "Неверный номер телефона",
			messageStyle: `
				color: #dc3545;
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
			iconStyles: `
				width: 30px;
				height: 30px;
				position: absolute;
				top: 50%;
				right: -10%;
				transform: translateY(-30%);
				object-fit: cover;
			`
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
				border: 0.1rem solid #198754;
			`,
			invalid: `
				border: 0.1rem solid #dc3545;
			`
		},
		errorMessage: {
			messageText: "Неверный адрес электронной почты",
			messageStyle: `
				color: #dc3545;
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
			iconStyles: `
				width: 30px;
				height: 30px;
				position: absolute;
				top: 50%;
				right: -10%;
				transform: translateY(-30%);
				object-fit: cover;
			`
		}
	}
];

export const formValidationInitialInputStyles: string = `
	border: 0.1rem solid var(--clr-primary-nileBlueHalfTransparent);
`;
