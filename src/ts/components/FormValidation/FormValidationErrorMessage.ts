import gsap from "gsap";
import { ErrorMessage } from "./FormValidation";

interface IFormValidationErrorMessage {
	messageClass: string | undefined;
	displayErrorMessage(
		targetInput: EventTarget | null,
		errorMessage: ErrorMessage,
		isValid: boolean
	): void;
}

export class FormValidationErrorMessage implements IFormValidationErrorMessage {
	messageClass: string | undefined;

	constructor ({ errorMessageClass }: { errorMessageClass: string | undefined }) {
		this.messageClass = errorMessageClass || "form-validation__error-message";
	}

	public displayErrorMessage(
		targetInput: EventTarget | null,
		errorMessage: ErrorMessage,
		isValid: boolean
	): void {
		if (isValid) this.#removeErrorMessage(targetInput);
		else this.#createErrorMessage(targetInput, errorMessage);
	}

	#removeErrorMessage(input: EventTarget | null): void {
		const errorMessage = (input as HTMLInputElement).parentNode?.querySelector(
			`.${this.messageClass}`
		);
		if (errorMessage) {
			gsap.fromTo(
				errorMessage,
				{ opacity: 1, translateX: 0 },
				{
					opacity: 0,
					translateX: 10,
					duration: 0.3,
					ease: "power2.out",
					onComplete: () => {
						errorMessage.remove();
					}
				}
			);
		}
	}

	#createErrorMessage(
		input: EventTarget | null,
		{ messageText, messageStyle }: { messageText: string; messageStyle: string }
	): void {
		if (
			(input as HTMLInputElement).parentNode?.querySelector(`.${this.messageClass}`)
		)
			return;
		const errorMessage = document.createElement("span");
		errorMessage.innerText = messageText;
		errorMessage.style.cssText = messageStyle;
		errorMessage.classList.add(`${this.messageClass}`);
		(input as HTMLInputElement).parentNode?.append(errorMessage);
		gsap.fromTo(
			errorMessage,
			{ opacity: 0, translateX: 10 },
			{ opacity: 1, translateX: 0, duration: 0.3, ease: "power2.out" }
		);
	}
}
