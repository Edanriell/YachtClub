import { gsap } from "gsap";

interface INotifications {
	timeline: gsap.core.Timeline;
	timeoutDelay: number;
	width: number;
	height: number;
	selector: string;
	showNotification(): void;
	hideNotification(): void;
	removeOnClick({
		notification,
		triggerButton
	}: {
		notification: HTMLDivElement;
		triggerButton: string;
	}): void;
	removeAfterTimeout({ timeout }: { timeout: boolean }): void;
	setStyles({ notificationSelector }: { notificationSelector: string }): void;
	initLoadingBar({ loadingBarSelector }: { loadingBarSelector: string }): void;
}

export class Notifications implements INotifications {
	timeline: gsap.core.Timeline = gsap.timeline();

	timeoutDelay: number;

	width: number;

	height: number;

	selector: string;

	constructor({
		notificationTimeoutDelay = 3000,
		notificationWidth = 500,
		notificationHeight = 135,
		notificationSelector = ".notification"
	}: {
		notificationTimeoutDelay?: number;
		notificationWidth?: number;
		notificationHeight?: number;
		notificationSelector?: string;
	}) {
		this.timeoutDelay = notificationTimeoutDelay;
		this.width = notificationWidth;
		this.height = notificationHeight;
		this.selector = notificationSelector;
	}

	showNotification(): void {
		this.timeline.fromTo(
			this.selector,
			{ opacity: 0, y: 40 },
			{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
		);
	}

	hideNotification(): void {
		this.timeline.fromTo(
			this.selector,
			{ opacity: 1, y: 0 },
			{
				opacity: 0,
				y: 40,
				duration: 0.35,
				ease: "power3.out",
				delay: 0.5,
				onComplete: () => {
					this.#removeNotification();
				}
			}
		);
	}

	#removeNotification(): void {
		const notification = document.querySelector(this.selector);
		notification?.remove();
	}

	removeOnClick({
		notification,
		triggerButton
	}: {
		notification: HTMLDivElement;
		triggerButton: string;
	}): void {
		const removeNotificationBtn = notification.querySelector(triggerButton);
		removeNotificationBtn?.addEventListener("click", () => {
			this.hideNotification();
		});
	}

	removeAfterTimeout({ timeout = false }: { timeout: boolean | number }): void {
		if (timeout) {
			setTimeout(() => {
				this.hideNotification();
			}, this.timeoutDelay);
		}
	}

	setStyles({ notificationSelector }: { notificationSelector: string }): void {
		const notification: HTMLElement | null = document.querySelector(notificationSelector);
		if (notification) {
			notification.style.cssText = `
			width: ${this.width}px;
			min-height: ${this.height}px
		`;
		}
	}

	initLoadingBar({ loadingBarSelector }: { loadingBarSelector: string }): void {
		const loadingBar: HTMLElement | null = document.querySelector(loadingBarSelector);
		if (!loadingBar) return;
		const time = this.timeoutDelay;
		const { width } = getComputedStyle(loadingBar);
		const barWidthPart = (parseFloat(width) / (time / 1000)) * 0.3;
		this.#updateLoadingBar(loadingBar, width, barWidthPart);
	}

	#updateLoadingBar(loadingBar: HTMLElement, barWidth: string, barWidthPart: number) {
		let currentBarWidth = parseFloat(barWidth);
		const updateBarWidth = setInterval(() => {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			decrementBarWidth(barWidthPart);
			loadingBar.style.cssText = `
				width: ${currentBarWidth}px;
				`;
		}, 300);
		function decrementBarWidth(width: number): number {
			if (currentBarWidth - width <= 0) {
				currentBarWidth = 0;
				clearInterval(updateBarWidth);
				return currentBarWidth;
			}
			currentBarWidth -= width;
			return currentBarWidth;
		}
	}
}
