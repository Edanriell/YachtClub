import gsap from "gsap";
// add support of multiple errors (errors variation)

type State = Record<string, boolean>;

export type Input = Array<{
	uniqueName: string;
	selector: string;
	testRegExp: RegExp;
	style: InputStyle;
	errorMessage: ErrorMessage;
	inputStateIcon: InputStateIcon;
}>;

type ErrorMessage = {
	messageText: string;
	messageStyle: string;
};

type InputStyle = {
	valid: string;
	invalid: string;
};

type InputStateIcon = {
	validInputIcon: string;
	invalidInputIcon: string;
	iconWidth: number;
	iconHeight: number;
};

export class FormValidation {
	formState = {};

	form: string;

	inputsArray: Input;

	initialInputStyle: string;

	button: HTMLElement | null;

	constructor({
		inputs,
		submitButton,
		form,
		initialInputStyle
	}: {
		inputs: Input;
		submitButton: string;
		form: string;
		initialInputStyle: string;
	}) {
		this.form = form;
		this.inputsArray = inputs;
		this.initialInputStyle = initialInputStyle;
		this.button = document.querySelector(submitButton);
	}

	init(): void {
		this.#createInitialState(this.inputsArray);

		for (const input of this.inputsArray) {
			document.querySelector(input.selector)?.addEventListener("input", event => {
				const currentInput = event.target as HTMLInputElement;
				const currentInputValue = currentInput.value;
				this.#checkInputValue({
					inputName: input.uniqueName,
					inputStyle: input.style,
					targetInput: currentInput,
					inputValue: currentInputValue,
					regExp: input.testRegExp,
					errorMessage: input.errorMessage,
					inputStateIcon: input.inputStateIcon
				});
			});
		}
		this.button?.addEventListener("click", () => {
			this.#resetState();
		});
	}

	#checkInputValue({
		inputName,
		inputStyle,
		targetInput,
		inputValue,
		regExp,
		errorMessage,
		inputStateIcon
	}: {
		inputName: string;
		inputStyle: InputStyle;
		targetInput: EventTarget | null;
		inputValue: string;
		regExp: RegExp;
		errorMessage: ErrorMessage;
		inputStateIcon: InputStateIcon;
	}): void {
		const validationResult = regExp.test(inputValue);
		this.#changeInputStyles(inputStyle, targetInput, validationResult);
		this.#displayErrorMessage(targetInput, errorMessage, validationResult);
		this.#displayInputStateIcon(targetInput, validationResult, inputStateIcon);
		this.formState = {
			...this.formState,
			[inputName]: validationResult
		};
		this.#toggleSubmitButtonAvailability();
	}

	#createInitialState(inputsArray: Input): void {
		const inputNames: Array<string> = [];
		const state: State = {};
		inputsArray.forEach(input => {
			inputNames.push(input.uniqueName);
		});
		for (const propertyName of inputNames) {
			state[propertyName] = false;
		}
		this.formState = state;
	}

	#toggleSubmitButtonAvailability(): void {
		if (!this.button) return;
		switch (!Object.values(this.formState).includes(false)) {
			case true:
				(this.button as HTMLButtonElement).disabled = false;
				(this.button as HTMLButtonElement).style.filter = "grayscale(0)";
				break;
			case false:
				(this.button as HTMLButtonElement).disabled = true;
				(this.button as HTMLButtonElement).style.filter = "grayscale(100%)";
				break;
			default:
				break;
		}
	}

	#resetState(): void {
		this.#createInitialState(this.inputsArray);
		const form = document.querySelector(`${this.form}`);
		const inputs = form?.querySelectorAll("input"); //
		inputs?.forEach(input => {
			input.classList.remove("Input-Invalid");
			input.classList.remove("Input-Valid");
			input.style.cssText = this.initialInputStyle;
		});
	}

	#changeInputStyles(style: InputStyle, input: EventTarget | null, isValid: boolean): void {
		switch (isValid) {
			case true:
				(input as HTMLInputElement).classList.remove("Input-Invalid");
				(input as HTMLInputElement).classList.add("Input-Valid");
				(input as HTMLInputElement).style.cssText = style.valid;
				break;
			case false:
				(input as HTMLInputElement).classList.add("Input-Invalid");
				(input as HTMLInputElement).classList.remove("Input-Valid");
				(input as HTMLInputElement).style.cssText = style.invalid;
				break;
			default:
				break;
		}
	}

	#displayErrorMessage(
		targetInput: EventTarget | null,
		errorMessage: ErrorMessage,
		isValid: boolean
	): void {
		switch (isValid) {
			case true:
				this.#removeErrorMessage(targetInput);
				break;
			case false:
				this.#createErrorMessage(targetInput, errorMessage);
				break;
			default:
				break;
		}
	}

	#removeErrorMessage(input: EventTarget | null): void {
		const errorMessage = (input as HTMLInputElement).parentNode?.querySelector(
			".ModalForm-ErrorMessage"
		);
		// add gsap here
		if (errorMessage) errorMessage.remove();
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
		// add gsap here
	}

	#displayInputStateIcon(
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

		if (successIcon || failureIcon) return;

		if (isInputValid) {
			this.#createInputStateIcon({
				iconType: inputStateIcon.validInputIcon,
				iconDescription: "Успех",
				iconWidth: inputStateIcon.iconWidth,
				iconHeight: inputStateIcon.iconHeight,
				input: targetInput,
				classes: "input-state-icon--type--success"
			});
		} else {
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
			// add gsap here
		} else if (!isInputValid && successIcon) {
			successIcon.remove();
			// add gsap here
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
		// add gsap here
	}
}
