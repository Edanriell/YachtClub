export class LinkDirectionAwareHoverEffect {
	init() {
		const links = document.querySelectorAll(".main-navigation__navigation-link");

		links.forEach(element => {
			element.addEventListener("mouseenter", event => {
				// console.log("ENTER")
				event.target?.addEventListener("mouseleave", event => {
					event.stopImmediatePropagation();
					// console.log("works leave2")
					const tolerance = 10;
					console.log(`tolerance = ${tolerance}`);
					const left = 0;
					console.log(`left = ${left}`);
					const right = element.clientWidth;
					console.log(`right = ${element.clientWidth}`);
					let x = (event as MouseEvent).pageX - (element as HTMLAnchorElement).offsetLeft;
					console.log(`x ${(event as MouseEvent).pageX} - ${(element as HTMLAnchorElement).offsetLeft} = ${x}`);
					if (x - tolerance < left) x = left;
					if (x + tolerance > right) x = right;
					(element as HTMLAnchorElement).style.setProperty("--x", `${x}px`);
				});
			});
		});
	}
}
