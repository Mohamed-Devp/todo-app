import "./Todo.css";

import todos from "../../todos.js";
import { createElement } from "../../utils.js";
import createCheckbox from "../Checkbox/Checkbox.js";

import IconCross from "./icon-cross.svg";

export default function createTodo(id, description, isCompleted) {
    const checkboxId = `checkbox-${id}`;
    const checkbox = createCheckbox(checkboxId, isCompleted, (e) => {
        const isCompleted = e.target.checked;
        todos.updateTodo(id, { isCompleted });
    });

    const descriptionLabel = createElement("label", {
        className: "todo__description",
        text: description,
        attrs: { for: checkboxId },
    });

    const iconCrossImg = createElement("img", {
        className: "todo__icon",
        attrs: { src: IconCross, alt: "Remove", title: "Remove" },
    });

    const removeBtn = createElement("button", {
        className: "todo__remove-btn",
        children: [iconCrossImg],
    });

    removeBtn.addEventListener("click", () => {
        todos.removeTodo(id);
    });

    const todo = createElement("li", {
        className: isCompleted ? "todo todo_completed" : "todo",
        children: [checkbox, descriptionLabel, removeBtn],
    });

    return todo;
}
