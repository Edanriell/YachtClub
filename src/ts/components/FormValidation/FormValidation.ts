import { FormValidationErrorMessage } from "./FormValidationErrorMessage";
import { FormValidationInputStateIcon } from "./FormValidationInputStateIcon";
import { FormValidationSubmitButton } from "./FormValidationSubmitButton";
import { FormValidationInput } from "./FormValidationInput";
// add support of multiple errors (errors variation)

interface IFormValidation {
	formState: Object;
	form: string;
	inputsArray: Input;
	initialInputStyle: string;
	button: HTMLElement | null;
	errorMessage: FormValidationErrorMessage;
	inputStateIcon: FormValidationInputStateIcon;
	submitButton: FormValidationSubmitButton;
	input: FormValidationInput;
	init(): void;
}

export type Input = Array<{
	uniqueName: string;
	selector: string;
	testRegExp: RegExp;
	style: InputStyle;
	errorMessage: ErrorMessage;
	inputStateIcon: InputStateIcon;
}>;

export type ErrorMessage = {
	messageText: string;
	messageStyle: string;
};

export type InputStateIcon = {
	validInputIcon: string;
	invalidInputIcon: string;
	iconWidth: number;
	iconHeight: number;
};

export type InputStyle = {
	valid: string;
	invalid: string;
};

type State = Record<string, boolean>;
export class FormValidation implements IFormValidation {
	formState = {};

	form: string;

	inputsArray: Input;

	initialInputStyle: string;

	button: HTMLElement | null;

	errorMessage: FormValidationErrorMessage;

	inputStateIcon: FormValidationInputStateIcon;

	submitButton: FormValidationSubmitButton;

	input: FormValidationInput;

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
		this.errorMessage = new FormValidationErrorMessage();
		this.inputStateIcon = new FormValidationInputStateIcon();
		this.submitButton = new FormValidationSubmitButton();
		this.input = new FormValidationInput();
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
			this.inputStateIcon.removeAllSuccessIcons();
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
		this.input.changeInputStyles(inputStyle, targetInput, validationResult);
		this.errorMessage.displayErrorMessage(targetInput, errorMessage, validationResult);
		this.inputStateIcon.displayInputStateIcon(targetInput, validationResult, inputStateIcon);
		this.formState = {
			...this.formState,
			[inputName]: validationResult
		};
		this.submitButton.toggleSubmitButtonAvailability(this.button, this.formState);
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

	#resetState(): void {
		this.#createInitialState(this.inputsArray);
		const form = document.querySelector(`${this.form}`);
		const inputs = form?.querySelectorAll("input");
		inputs?.forEach(input => {
			input.classList.remove("Input-Invalid");
			input.classList.remove("Input-Valid");
			input.style.cssText = this.initialInputStyle;
		});
	}
}
