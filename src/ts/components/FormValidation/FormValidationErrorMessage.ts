import gsap from "gsap";
import { ErrorMessage } from "./FormValidation";

interface IFormValidationErrorMessage {
	displayErrorMessage(
		targetInput: EventTarget | null,
		errorMessage: ErrorMessage,
		isValid: boolean
	): void;
}

export class FormValidationErrorMessage implements IFormValidationErrorMessage {
	public displayErrorMessage(
		targetInput: EventTarget | null,
		errorMessage: ErrorMessage,
		isValid: boolean
	): void {
		if (isValid) this.#removeErrorMessage(targetInput);
		else this.#createErrorMessage(targetInput, errorMessage);
		// switch (isValid) {
		// 	case true:
		// 		this.#removeErrorMessage(targetInput);
		// 		break;
		// 	case false:
		// 		this.#createErrorMessage(targetInput, errorMessage);
		// 		break;
		// 	default:
		// 		break;
		// }
	}

	#removeErrorMessage(input: EventTarget | null): void {
		const errorMessage = (input as HTMLInputElement).parentNode?.querySelector(
			".ModalForm-ErrorMessage"
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
		if ((input as HTMLInputElement).parentNode?.querySelector(".ModalForm-ErrorMessage"))
			return;
		const errorMessage = document.createElement("span");
		errorMessage.innerText = messageText;
		errorMessage.style.cssText = messageStyle;
		errorMessage.classList.add("ModalForm-ErrorMessage");
		(input as HTMLInputElement).parentNode?.append(errorMessage);
		gsap.fromTo(
			errorMessage,
			{ opacity: 0, translateX: 10 },
			{ opacity: 1, translateX: 0, duration: 0.3, ease: "power2.out" }
		);
	}
}
