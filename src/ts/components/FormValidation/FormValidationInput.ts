import { InputStyle } from "./FormValidation";

interface IFormValidationInput {
	changeInputStyles(style: InputStyle, input: EventTarget | null, isValid: boolean): void;
}

export class FormValidationInput implements IFormValidationInput {
	public changeInputStyles(style: InputStyle, input: EventTarget | null, isValid: boolean): void {
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
}
