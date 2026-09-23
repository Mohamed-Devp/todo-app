import "./TodoForm.css";

import todos from "../../todos.js";
import { createElement } from "../../utils.js";
import createCheckbox from "../../components/Checkbox/Checkbox.js";

import IconPlus from "./icon-plus.svg";

export default function createTodoForm() {
    const checkbox = createCheckbox("todo-checkbox", false);

    const descriptionField = createElement("input", {
        className: "todo-form__field",
        attrs: {
            type: "text",
            placeholder: "Create a new todo...",
            "aria-label": "Description",
        },
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

    const onTodoFormSubmit = (e) => {
        e.preventDefault();

        const isCompleted = checkbox.checked;
        const description = descriptionField.value.trim();

        if (description.length > 0) {
            todos.addTodo(description, isCompleted);
            todoForm.reset();
        }
    };

    todoForm.addEventListener("submit", onTodoFormSubmit);

    return todoForm;
}
