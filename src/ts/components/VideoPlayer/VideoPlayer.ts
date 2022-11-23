interface IVideoPlayer {
	trigger: HTMLElement | null;
	poster: HTMLElement | null;
	player: HTMLVideoElement | null;
    init(): void;
}

export class VideoPlayer implements IVideoPlayer {
	trigger: HTMLElement | null;

	poster: HTMLElement | null;

	player: HTMLVideoElement | null;

	constructor({
		triggerSelector,
		posterSelector,
		playerSelector
	}: {
		triggerSelector: string;
		posterSelector: string;
		playerSelector: string;
	}) {
		this.trigger = document.querySelector(triggerSelector);
		this.poster = document.querySelector(posterSelector);
		this.player = document.querySelector(playerSelector);
	}

	public init(): void {
		this.trigger?.addEventListener("click", () => {
			this.#removePoster();
			this.#startVideo();
			this.#removePlayButton();
		});
	}

	#removePoster(): void {
		this.poster?.remove();
	}

	#removePlayButton(): void {
		this.trigger?.remove();
	}

	#startVideo(): void {
		if (this.player != null) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.player.play();
		}
	}
}
