import "./TodoForm.css";

import { createElement } from "../../utils.js";
import createCheckbox from "../../components/Checkbox/Checkbox.js";

import IconPlus from "./icon-plus.svg";

export default function createTodoForm() {
    let description = "",
        isCompleted = false;

    const checkbox = createCheckbox("todo-checkbox", isCompleted, (e) => {
        const tgt = e.target;
        isCompleted = tgt.checked;
    });

    const descriptionField = createElement("input", {
        className: "todo-form__field",
        attrs: {
            type: "text",
            name: "description",
            placeholder: "Create a new todo...",
            "aria-label": "Description",
        },
    });

    descriptionField.addEventListener("change", () => {
        description = descriptionField.value;
    });

    const iconPlusImg = createElement("img", {
        className: "todo-form__icon",
        attrs: { src: IconPlus, alt: "Add", title: "Add" },
    });

    const submitBtn = createElement("button", {
        className: "todo-form__submit-btn",
        children: [iconPlusImg],
    });

    const todoForm = createElement("form", {
        className: "todo-form",
        children: [checkbox, descriptionField, submitBtn],
        attrs: { novalidate: "novalidate" },
    });

    return todoForm;
}
