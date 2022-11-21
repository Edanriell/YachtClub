import "../scss/style.scss";

import { LinkDirectionAwareHoverEffect } from "./components/linkDirectionAwareHoverEffect";

window.addEventListener("DOMContentLoaded", () => {
	const linkDirectionAwareHoverEffect = new LinkDirectionAwareHoverEffect();
	linkDirectionAwareHoverEffect.init();
});
