import gsap from "gsap";
import { InputStateIcon } from "./FormValidation";

interface IFormValidationInputStateIcon {
	successIconClass: string;
	failureIconClass: string;
	displayInputStateIcon(
		targetInput: EventTarget | null,
		isValid: boolean,
		inputStateIcon: InputStateIcon
	): void;
}

export class FormValidationInputStateIcon implements IFormValidationInputStateIcon {
	successIconClass: string;

	failureIconClass: string;

	constructor({
		inputStateIconClassSuccess,
		inputStateIconClassFailure
	}: {
		inputStateIconClassSuccess: string | undefined;
		inputStateIconClassFailure: string | undefined;
	}) {
		this.successIconClass = inputStateIconClassSuccess || "form-validation__input-state-icon--type--success",
		this.failureIconClass = inputStateIconClassFailure || "form-validation__input-state-icon--type--failure"
	}

	public displayInputStateIcon(
		targetInput: EventTarget | null,
		isValid: boolean,
		inputStateIcon: InputStateIcon
	): void {
		this.#removeInputStateIcon(targetInput, isValid);
		this.#showInputStateIcon(targetInput, isValid, inputStateIcon);
	}

	#showInputStateIcon(
		targetInput: EventTarget | null,
		isInputValid: boolean,
		inputStateIcon: InputStateIcon
	): void {
		const successIcon = (targetInput as HTMLElement).parentElement?.querySelector(
			`.${this.successIconClass}`
		);
		const failureIcon = (targetInput as HTMLElement).parentElement?.querySelector(
			`.${this.failureIconClass}`
		);

		if (isInputValid && !successIcon) {
			this.#createInputStateIcon({
				iconType: inputStateIcon.validInputIcon,
				iconDescription: "Успех",
				iconWidth: inputStateIcon.iconWidth,
				iconHeight: inputStateIcon.iconHeight,
				input: targetInput,
				classes: `${this.successIconClass}`
			});
		} else if (!isInputValid && !failureIcon) {
			this.#createInputStateIcon({
				iconType: inputStateIcon.invalidInputIcon,
				iconDescription: "Ошибка",
				iconWidth: inputStateIcon.iconWidth,
				iconHeight: inputStateIcon.iconHeight,
				input: targetInput,
				classes: `${this.failureIconClass}`
			});
		}
	}

	#removeInputStateIcon(targetInput: EventTarget | null, isInputValid: boolean) {
		const successIcon = (targetInput as HTMLElement).parentElement?.querySelector(
			`.${this.successIconClass}`
		);
		const failureIcon = (targetInput as HTMLElement).parentElement?.querySelector(
			`.${this.failureIconClass}`
		);

		if (isInputValid && failureIcon) {
			failureIcon.remove();
		} else if (!isInputValid && successIcon) {
			successIcon.remove();
		}
	}

	#createInputStateIcon({
		iconType,
		iconDescription,
		iconWidth,
		iconHeight,
		input,
		classes
	}: {
		iconType: string;
		iconDescription: string;
		iconWidth: number;
		iconHeight: number;
		input: EventTarget | null;
		classes: string;
	}): void {
		console.log("creating");
		const icon = document.createElement("div");
		icon.classList.add("input-state-icon", `${classes}`);
		icon.style.cssText = `
			width: ${iconWidth}px;
			height: ${iconHeight}px;
			position: absolute;
			top: 50%;
			right: -10%;
			transform: translateY(-30%);
			object-fit: cover;
			`;
		icon.innerHTML = `
			<img src=${iconType} alt="">
				<span class="visually-hidden">${iconDescription}</span>
			</img>
		`;
		(input as HTMLElement).parentElement?.append(icon);
		gsap.fromTo(
			icon,
			{ opacity: 0, scale: 0 },
			{
				opacity: 1,
				scale: 1,
				duration: 0.3,
				ease: "power2.out"
			}
		);
	}

	public removeAllSuccessIcons() {
		const successIcons = document.querySelectorAll(`.${this.successIconClass}`);
		gsap.fromTo(
			successIcons,
			{ opacity: 1, scale: 1 },
			{
				opacity: 0,
				scale: 0,
				duration: 0.3,
				ease: "power2.out",
				stagger: 0.15,
				onComplete: () => {
					successIcons.forEach(icon => icon.remove());
				}
			}
		);
	}
}
