import "./Checkbox.css";

import { createElement } from "../../utils.js";

export default function createCheckbox(id, isChecked, onChange) {
    const checkbox = createElement("input", {
        className: "checkbox",
        attrs: { id, type: "checkbox" },
    });

    checkbox.checked = isChecked;

    checkbox.addEventListener("change", onChange);

    return checkbox;
}
