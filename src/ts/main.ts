import "../scss/style.scss";

import { LinkDirectionAwareHoverEffect } from "./components/linkDirectionAwareHoverEffect";

window.addEventListener("DOMContentLoaded", () => {
	const linkDirectionAwareHoverEffect = new LinkDirectionAwareHoverEffect({
        linksSelector: ".main-navigation__navigation-link",
        underlineColor: "hsl(177deg, 100%, 39%)"
    });

	linkDirectionAwareHoverEffect.init();
});
