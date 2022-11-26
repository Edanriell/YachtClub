interface ICustomCheckbox {
	checkbox: HTMLElement | null;
	svg: HTMLElement | null;
	reverseAnimation: string;
	init(): void;
}

export class CustomCheckbox implements ICustomCheckbox {
	checkbox: HTMLElement | null;
	svg: HTMLElement | null;
	reverseAnimation: string;

	constructor({
		checkboxSelector,
		svgSelector,
		reverseAnimationClassName
	}: {
		checkboxSelector: string;
		svgSelector: string;
		reverseAnimationClassName: string;
	}) {
		this.checkbox = document.getElementById(checkboxSelector);
		this.svg = document.querySelector(svgSelector);
		this.reverseAnimation = reverseAnimationClassName;
	}

	public init(): void {
		this.svg?.addEventListener("click", () => {
			if ((this.checkbox as HTMLInputElement).checked)
				this.svg?.classList.add(this.reverseAnimation);
			else this.svg?.classList.remove(this.reverseAnimation);
		});
	}
}
