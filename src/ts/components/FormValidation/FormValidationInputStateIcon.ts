import gsap from "gsap";
import { InputStateIcon } from "./FormValidation";

export class FormValidationInputStateIcon {
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
			".input-state-icon--type--success"
		);
		const failureIcon = (targetInput as HTMLElement).parentElement?.querySelector(
			".input-state-icon--type--failure"
		);

		// if (successIcon || failureIcon) {
		// 	console.log("icon found");
		// 	console.log(successIcon);
		// 	console.log(failureIcon);
		// 	return;
		// }

		if (isInputValid && !successIcon) {
			this.#createInputStateIcon({
				iconType: inputStateIcon.validInputIcon,
				iconDescription: "Успех",
				iconWidth: inputStateIcon.iconWidth,
				iconHeight: inputStateIcon.iconHeight,
				input: targetInput,
				classes: "input-state-icon--type--success"
			});
		} else if (!isInputValid && !failureIcon) {
			this.#createInputStateIcon({
				iconType: inputStateIcon.invalidInputIcon,
				iconDescription: "Ошибка",
				iconWidth: inputStateIcon.iconWidth,
				iconHeight: inputStateIcon.iconHeight,
				input: targetInput,
				classes: "input-state-icon--type--failure"
			});
		}
	}

	#removeInputStateIcon(targetInput: EventTarget | null, isInputValid: boolean) {
		const successIcon = (targetInput as HTMLElement).parentElement?.querySelector(
			".input-state-icon--type--success"
		);
		const failureIcon = (targetInput as HTMLElement).parentElement?.querySelector(
			".input-state-icon--type--failure"
		);

		if (isInputValid && failureIcon) {
			failureIcon.remove();
			// gsap.fromTo(
			// 	failureIcon,
			// 	{ opacity: 1, scale: 1 },
			// 	{
			// 		opacity: 0,
			// 		scale: 0,
			// 		duration: 0.3,
			// 		ease: "power2.out",
			// 		onComplete: () => {
			// 			failureIcon.remove();
			// 		}
			// 	}
			// );
		} else if (!isInputValid && successIcon) {
			successIcon.remove();
			// gsap.fromTo(
			// 	successIcon,
			// 	{ opacity: 1, scale: 1 },
			// 	{
			// 		opacity: 0,
			// 		scale: 0,
			// 		duration: 0.3,
			// 		ease: "power2.out",
			// 		onComplete: () => {
			// 			successIcon.remove();
			// 		}
			// 	}
			// );
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
}
