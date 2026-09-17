import "./Logo.css";

import { createElement } from "../../utils.js";

export default function createLogo() {
    const logo = createElement("a", {
        className: "logo",
        text: "TODO",
        attrs: { href: "/", title: "Homepage" },
    });

    return logo;
}
