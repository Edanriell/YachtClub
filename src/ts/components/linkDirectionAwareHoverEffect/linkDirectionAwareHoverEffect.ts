interface ILinkDirectionAwareHoverEffect {
	links: NodeListOf<Element>;
	color: string;
	init(): void;
}

export class LinkDirectionAwareHoverEffect implements ILinkDirectionAwareHoverEffect {
	links: NodeListOf<Element>;
	color: string;

	constructor({
		linksSelector,
		underlineColor
	}: {
		linksSelector: string;
		underlineColor?: string;
	}) {
		this.links = document.querySelectorAll(linksSelector);
		this.color = underlineColor || "blue";
	}

	public init(): void {
		this.links.forEach(element => {
			this.setUnderlineColor(this.color, element);
			["mouseenter", "mouseleave"].forEach(eventType => {
				element.addEventListener(eventType, event => {
					this.#showUnderline(element, event);
				});
			});
		});
	}

	private setUnderlineColor(color: string, element: Element): void {
		(element as HTMLAnchorElement).style.setProperty("--underlineColor", `${color}`);
	}

	#showUnderline(element: Element, event: Event): void {
		this.#calculateUnderlineStartingPoint(element, event);
	}

	#calculateUnderlineStartingPoint(element: Element, event: Event): void {
		const tolerance = 10;
		const left = 0;
		const right = element.clientWidth;
		let x = (event as MouseEvent).pageX - (element as HTMLAnchorElement).offsetLeft;
		if (x - tolerance < left) x = left;
		if (x + tolerance > right) x = right;
		this.#displayUnderline(element, x);
	}

	#displayUnderline(element: Element, x: number): void {
		(element as HTMLAnchorElement).style.setProperty("--x", `${x}px`);
	}
}
