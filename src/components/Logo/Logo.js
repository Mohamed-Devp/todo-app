import "./Logo.css";

import { createElement } from "../../utils.js";

export default function createLogo() {
    const logo = createElement("h1", {
        className: "logo",
        text: "TODO",
    });

    return logo;
}
