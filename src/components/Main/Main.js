import "./Main.css";

import { createElement } from "../../utils.js";
import createTodoForm from "../TodoForm/TodoForm.js";
import createTodosPanel from "../TodosPanel/TodosPanel.js";

export default function createMain() {
    const main = createElement("main", {
        className: "main",
        children: [createTodoForm(), createTodosPanel()],
    });

    return main;
}
