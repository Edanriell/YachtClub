import { Notifications } from "./Notifications";
import SuccessIcon from "../../../images/icons/notifications/success.svg";

export interface ISuccessMessage {
	messageText: string;
	messageTypeText: string;
	notificationsContainer: HTMLElement | null;
	icon: string;
	init(): void;
}

export class SuccessMessage extends Notifications implements ISuccessMessage {
	messageText: string;

	messageTypeText: string;

	notificationsContainer: HTMLElement | null;

	icon: string;

	constructor({
		successMessageText,
		successMessageTypeText,
		successMessageTimeoutDelay,
		successMessageWidth,
		successMessageHeight,
		notificationsContainerSelector
	}: {
		successMessageText: string;
		successMessageTypeText: string;
		successMessageTimeoutDelay: number;
		successMessageWidth?: number;
		successMessageHeight?: number;
		notificationsContainerSelector?: string;
	}) {
		super({
			notificationTimeoutDelay: successMessageTimeoutDelay,
			notificationWidth: successMessageWidth,
			notificationHeight: successMessageHeight
		});
		this.messageText = successMessageText;
		this.messageTypeText = successMessageTypeText;
		this.notificationsContainer = document.querySelector(
			notificationsContainerSelector || ".notifications-container"
		);
		this.icon = SuccessIcon;
	}

	init(): void {
		this.#createMessage();
	}

	#createMessage(): void {
		const messageWrapper = document.createElement("div");

		messageWrapper.innerHTML = `
		<div class="notification">
			<div class="notification__content-wrapper">
				<div class="notification__icon-wrapper">
					<img
						class="notification__icon"
						src=${this.icon}
						width="40"
						height="40"
						alt="Иконка оповещения"
					/>
				</div>
				<div class="notification__content">
					<strong class="notification__type-text">${this.messageTypeText}</strong>
					<p class="notification__text notification__text--color--green">
						${this.messageText}
					</p>
				</div>
				<button class="notification__close" type="button">
					<span class="visually-hidden">
						Закрыть оповещение
					</span>
				</button>
			</div>
            <div class="notification__time-bar">
                <div class="notification__time-bar-current
					notification__time-bar-current--color--green"></div>
                <div class="notification__time-bar-total
					notification__time-bar-total--color--green"></div>
            </div>
		</div>
		`;

		messageWrapper.classList.add("notification__wrapper");

		if (this.notificationsContainer) this.notificationsContainer.append(messageWrapper);

		this.showNotification();

		this.removeOnClick({
			notification: messageWrapper,
			triggerButton: ".notification__close"
		});

		this.removeAfterTimeout({
			timeout: true
		});

		this.initLoadingBar({
			loadingBarSelector: ".notification__time-bar-current"
		});
	}
}
