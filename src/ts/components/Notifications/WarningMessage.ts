import { Notifications } from "./Notifications";
import WarningIcon from "../../../images/icons/notifications/warning.svg";

export interface IWarningMessage {
	messageText: string;
	messageTypeText: string;
	notificationsContainer: HTMLElement | null;
	icon: string;
	init(): void;
}

export class WarningMessage extends Notifications implements IWarningMessage {
	messageText: string;

	messageTypeText: string;

	notificationsContainer: HTMLElement | null;

	icon: string;

	constructor({
		warningMessageText,
		warningMessageTypeText,
		warningMessageTimeoutDelay,
		warningMessageWidth,
		warningMessageHeight,
		notificationsContainerSelector
	}: {
		warningMessageText: string;
		warningMessageTypeText: string;
		warningMessageTimeoutDelay: number;
		warningMessageWidth?: number;
		warningMessageHeight?: number;
		notificationsContainerSelector?: string;
	}) {
		super({
			notificationTimeoutDelay: warningMessageTimeoutDelay,
			notificationWidth: warningMessageWidth,
			notificationHeight: warningMessageHeight
		});
		this.messageText = warningMessageText;
		this.messageTypeText = warningMessageTypeText;
		this.notificationsContainer = document.querySelector(
			notificationsContainerSelector || ".notifications-container"
		);
		this.icon = WarningIcon;
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
					<p class="notification__text notification__text--color--blue">
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
					notification__time-bar-current--color--blue"></div>
                <div class="notification__time-bar-total
					notification__time-bar-total--color--blue"></div>
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

		// this.setStyles({
		// 	notificationSelector: ".notification"
		// });

		this.initLoadingBar({
			loadingBarSelector: ".notification__time-bar-current"
		});
	}
}
