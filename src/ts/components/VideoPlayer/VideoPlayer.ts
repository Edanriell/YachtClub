import gsap from "gsap";

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
			this.#removePlayButton();
			this.#startVideo();
		});
	}

	#removePoster(): void {
		gsap.fromTo(
			this.poster,
			{ opacity: 1 },
			{
				opacity: 0,
				duration: 0.3,
				ease: "power1.out",
				onComplete: () => {
					if (
						this.poster?.parentElement &&
						this.poster?.parentElement?.nextElementSibling &&
						this.poster?.parentElement?.nextElementSibling.classList.contains(
							"video__player-overlay"
						)
					) {
						this.poster?.parentElement?.nextElementSibling.remove();
						this.poster?.parentElement.remove();
					} else if (this.poster?.parentElement) {
						this.poster?.parentElement.remove();
					} else {
						this.poster?.remove();
					}
				}
			}
		);
	}

	#removePlayButton(): void {
		gsap.fromTo(
			this.trigger,
			{ opacity: 1, scale: 1 },
			{
				opacity: 0,
				scale: 0,
				duration: 0.2,
				ease: "power1.out",
				onComplete: () => {
					if (this.trigger?.parentElement) {
						this.trigger?.parentElement.remove();
					} else {
						this.trigger?.remove();
					}
				}
			}
		);
	}

	#startVideo(): void {
		if (this.player != null) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.player.play();
		}
	}
}
