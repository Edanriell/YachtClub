interface IFormValidationSubmitButton {
	toggleSubmitButtonAvailability(button: HTMLElement | null, formState: Object): void;
}

export class FormValidationSubmitButton implements IFormValidationSubmitButton{
	public toggleSubmitButtonAvailability(button: HTMLElement | null, formState: Object): void {
		if (!button) return;
		switch (!Object.values(formState).includes(false)) {
			case true:
				(button as HTMLButtonElement).disabled = false;
				(button as HTMLButtonElement).style.filter = "grayscale(0)";
				break;
			case false:
				(button as HTMLButtonElement).disabled = true;
				(button as HTMLButtonElement).style.filter = "grayscale(100%)";
				break;
			default:
				break;
		}
	}
}
