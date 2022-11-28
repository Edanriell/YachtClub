import { postData } from "../../services";
import { Spinner } from "../Spinner";
import { ErrorMessage, SuccessMessage, IErrorMessage, ISuccessMessage } from "../Notifications";

interface IForms {
	form: HTMLElement | null;
	submitButton: HTMLElement | null;
	host: string;
	port: number;
	database: string;
	errorMessage: IErrorMessage;
	successMessage: ISuccessMessage;
	init(): void;
}

export class Forms implements IForms {
	form: HTMLElement | null;

	submitButton: HTMLElement | null;

	host: string;

	port: number;

	database: string;

	errorMessage: IErrorMessage = new ErrorMessage({
		errorMessageText:
			"Нам не удалось отправить ваши данные на сервер, повторите попытку позже.",
		errorMessageTypeText: "Ошибка передачи данных.",
		errorMessageTimeoutDelay: 5000
	});

	successMessage: ISuccessMessage = new SuccessMessage({
		successMessageText: "Данные успешно отправлены, в кратчайшие сроки они будут обработаны.",
		successMessageTypeText: "Успех.",
		successMessageTimeoutDelay: 5000
	});

	constructor({
		formSelector,
		submitButtonSelector,
		hostName,
		databasePort,
		databaseName
	}: {
		formSelector: string;
		submitButtonSelector: string;
		hostName?: string | null;
		databasePort?: number | null;
		databaseName: string;
	}) {
		this.form = document.querySelector(formSelector);
		this.submitButton = document.querySelector(submitButtonSelector);
		this.host = hostName || "localhost";
		this.port = databasePort || 3000;
		this.database = databaseName;
	}

	init(): void {
		this.form?.addEventListener("submit", event => {
			this.#sendData(event, this.form, this.host, this.port, this.database);
		});
	}

	async #sendData(
		event: SubmitEvent,
		form: HTMLElement | null,
		host: string,
		port: number,
		database: string
	): Promise<void> {
		event.preventDefault();
		if (!form) return;
		const formData = new FormData(form as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());
		const spinner = Spinner.getInstance();
		let buttonText = null;

		if (this.submitButton?.children && this.submitButton?.children.length > 0) {
			buttonText = this.submitButton?.children as unknown as HTMLElement;
			console.log(this.submitButton?.children);
		} else {
			throw new Error("Submit button text should be wrapped in any tag");
		}

		spinner.toggleButtonTextVisibility({
			buttonText,
			hide: true
		});
		spinner.showSpinner(this.submitButton);

		try {
			await postData({
				url: `http://${host}:${port}/${database}`,
				data
			});
			spinner.hideSpinner();
			spinner.toggleButtonTextVisibility({
				buttonText,
				show: true,
				animationDelay: 0.4
			});
			this.successMessage.init();
		} catch {
			spinner.hideSpinner();
			spinner.toggleButtonTextVisibility({
				buttonText,
				show: true,
				animationDelay: 0.4
			});
			this.errorMessage.init();
		} finally {
			(form as HTMLFormElement).reset();
		}
	}
}
