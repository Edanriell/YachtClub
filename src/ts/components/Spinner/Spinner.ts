import { gsap } from "gsap";

type TSpinner = InstanceType<typeof Spinner>;

type SpinnerPosition = HTMLElement | null;

interface ISpinner {
	showSpinner(position: SpinnerPosition): void;
	hideSpinner(): void;
	toggleButtonTextVisibility({
		buttonText,
		hide,
		show,
		animationDelay
	}: {
		buttonText: HTMLElement | null;
		hide: boolean;
		show: boolean;
		animationDelay: number;
	}): void;
}

export class Spinner implements ISpinner {
	static #instance: TSpinner;

	static #tlSpinner: gsap.core.Timeline = gsap.timeline({ duration: 1 });

	static #tlButton: gsap.core.Timeline = gsap.timeline({ duration: 1, ease: "power2.out" });

	static spinnerSelector = "spinner";

	static spinnerImageSelector = "spinner__image";

	static getInstance(): TSpinner {
		if (!Spinner.#instance) {
			Spinner.#instance = new Spinner();
		}
		return Spinner.#instance;
	}

	showSpinner(position: SpinnerPosition): void {
		this.#createSpinner(position);
	}

	#createSpinner(position: SpinnerPosition): void {
		const spinnerContainer = document.createElement("div");
		spinnerContainer.classList.add(`${Spinner.spinnerSelector}`);
		spinnerContainer.innerHTML = `
        <span class="${Spinner.spinnerImageSelector}">
            <span class="visually-hidden">Загрузка</span>
        </span>
        `;
		position?.append(spinnerContainer);
		this.#spinnerAnimations({
			showSpinner: true
		});
	}

	#spinnerAnimations({ showSpinner = false, hideSpinner = false }): void {
		if (showSpinner && hideSpinner) return;
		if (!showSpinner && !hideSpinner) return;
		if (showSpinner) {
			Spinner.#tlSpinner.fromTo(
				`.${Spinner.spinnerSelector}`,
				{ opacity: 0, scale: 0.4 },
				{ opacity: 1, scale: 1.2, duration: 0.3, ease: "power2.out", delay: 0.4 }
			);
		}
		if (hideSpinner) {
			Spinner.#tlSpinner.fromTo(
				`.${Spinner.spinnerSelector}`,
				{ opacity: 1, scale: 1.2 },
				{
					opacity: 0,
					scale: 0.4,
					duration: 0.3,
					onComplete: () => {
						this.#removeSpinner();
					}
				}
			);
		}
	}

	hideSpinner(): void {
		this.#spinnerAnimations({
			hideSpinner: true
		});
	}

	#removeSpinner(): void {
		const spinner = document.querySelector(`.${Spinner.spinnerSelector}`);
		spinner?.remove();
	}

	toggleButtonTextVisibility({
		buttonText,
		hide = false,
		show = false,
		animationDelay = 0
	}: {
		buttonText: HTMLElement | null;
		hide?: boolean;
		show?: boolean;
		animationDelay?: number;
	}): void {
		if (buttonText && hide) {
			Spinner.#tlButton.fromTo(
				buttonText,
				{ opacity: 1 },
				{ opacity: 0, scale: 0.8, duration: 0.6, ease: "power2.out" }
			);
		} else if (buttonText && show) {
			Spinner.#tlButton.fromTo(
				buttonText,
				{ opacity: 0, scale: 0.8 },
				{ opacity: 1, scale: 1, duration: 0.3, ease: "power2.out", delay: animationDelay }
			);
		}
	}
}
