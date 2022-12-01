interface IFormValidationSubmitButton {
	toggleSubmitButtonAvailability(button: HTMLElement | null, formState: Object): void;
}

export class FormValidationSubmitButton implements IFormValidationSubmitButton {
	public toggleSubmitButtonAvailability(button: HTMLElement | null, formState: Object): void {
		if (!button) return;
		if (!Object.values(formState).includes(false)) {
			(button as HTMLButtonElement).disabled = false;
			(button as HTMLButtonElement).style.filter = "grayscale(0)";
		} else {
			(button as HTMLButtonElement).disabled = true;
			(button as HTMLButtonElement).style.filter = "grayscale(100%)";
		}
	}
}
