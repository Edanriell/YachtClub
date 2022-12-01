import { InputStyle } from "./FormValidation";

interface IFormValidationInput {
	changeInputStyles({
		style,
		input,
		isValid
	}: {
		style: InputStyle;
		input: EventTarget | null;
		isValid: boolean;
		validInputClass: string;
		invalidInputClass: string;
	}): void;
}

export class FormValidationInput implements IFormValidationInput {
	public changeInputStyles({
		style,
		input,
		isValid,
		validInputClass,
		invalidInputClass
	}: {
		style: InputStyle;
		input: EventTarget | null;
		isValid: boolean;
		validInputClass: string;
		invalidInputClass: string;
	}): void {
		if (isValid) {
			(input as HTMLInputElement).classList.remove(invalidInputClass);
			(input as HTMLInputElement).classList.add(validInputClass);
			(input as HTMLInputElement).style.cssText = style.valid;
		} else {
			(input as HTMLInputElement).classList.add(invalidInputClass);
			(input as HTMLInputElement).classList.remove(validInputClass);
			(input as HTMLInputElement).style.cssText = style.invalid;
		}
	}
}
