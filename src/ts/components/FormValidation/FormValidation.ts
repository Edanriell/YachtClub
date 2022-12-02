import { FormValidationErrorMessage } from "./FormValidationErrorMessage";
import { FormValidationInputStateIcon } from "./FormValidationInputStateIcon";
import { FormValidationSubmitButton } from "./FormValidationSubmitButton";
import { FormValidationInput } from "./FormValidationInput";

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
	validClass: string;
	invalidClass: string;
	invalidInputMessageClass: string | undefined;
	inputIconClass: string | undefined;
	inputIconClassFailure: string | undefined;
	inputIconClassSuccess: string | undefined;
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
	iconStyles: string;
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

	validClass: string;

	invalidClass: string;

	invalidInputMessageClass: string | undefined;

	inputIconClass: string | undefined;

	inputIconClassFailure: string | undefined;

	inputIconClassSuccess: string | undefined;

	constructor({
		inputs,
		submitButton,
		form,
		initialInputStyle,
		validInputClass,
		invalidInputClass,
		errorMessageClass,
		inputStateIconClass,
		inputStateIconClassFailure,
		inputStateIconClassSuccess
	}: {
		inputs: Input;
		submitButton: string;
		form: string;
		initialInputStyle: string;
		validInputClass?: string;
		invalidInputClass?: string;
		errorMessageClass?: string;
		inputStateIconClass?: string;
		inputStateIconClassFailure?: string;
		inputStateIconClassSuccess?: string;
	}) {
		this.form = form;
		this.inputsArray = inputs;
		this.initialInputStyle = initialInputStyle;
		this.invalidInputMessageClass = errorMessageClass;
		this.inputIconClass = inputStateIconClass;
		this.inputIconClassFailure = inputStateIconClassFailure;
		this.inputIconClassSuccess = inputStateIconClassSuccess;
		this.button = document.querySelector(submitButton);
		this.errorMessage = new FormValidationErrorMessage({
			errorMessageClass: this.invalidInputMessageClass
		});
		this.inputStateIcon = new FormValidationInputStateIcon({
			inputStateIconClass: this.inputIconClass,
			inputStateIconClassSuccess: this.inputIconClassSuccess,
			inputStateIconClassFailure: this.inputIconClassFailure
		});
		this.submitButton = new FormValidationSubmitButton();
		this.input = new FormValidationInput();
		this.validClass = validInputClass || "input-valid";
		this.invalidClass = invalidInputClass || "input-invalid";
	}

	public init(): void {
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
			this.#resetState({
				validInputClass: this.validClass,
				invalidInputClass: this.invalidClass
			});
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
		this.input.changeInputStyles({
			style: inputStyle,
			input: targetInput,
			isValid: validationResult,
			validInputClass: this.validClass,
			invalidInputClass: this.invalidClass
		});
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

	#resetState({
		validInputClass,
		invalidInputClass
	}: {
		validInputClass: string;
		invalidInputClass: string;
	}): void {
		this.#createInitialState(this.inputsArray);
		const form = document.querySelector(`${this.form}`);
		const inputs = form?.querySelectorAll("input");
		inputs?.forEach(input => {
			input.classList.remove(invalidInputClass);
			input.classList.remove(validInputClass);
			input.style.cssText = this.initialInputStyle;
		});
	}
}
