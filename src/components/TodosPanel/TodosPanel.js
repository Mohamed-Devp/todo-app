import "./TodosPanel.css";

import pubsub from "../../pubsub.js";
import { createElement } from "../../utils.js";
import createTodo from "../../components/Todo/Todo.js";

function createTabsBar() {
    const tabBtns = [
        createElement("button", {
            className: "todos-panel__tab todos-panel__tab_selected",
            text: "All",
            attrs: { "data-tab": "all" },
        }),
        createElement("button", {
            className: "todos-panel__tab",
            text: "Active",
            attrs: { "data-tab": "active" },
        }),
        createElement("button", {
            className: "todos-panel__tab",
            text: "Completed",
            attrs: { "data-tab": "completed" },
        }),
    ];

    const tabsBar = createElement("div", {
        className: "todos-panel__tabs-bar",
        children: tabBtns,
    });

    return tabsBar;
}

function createHeader() {
    const tabBtns = [
        createElement("button", {
            className: "todos-panel__tab todos-panel__tab_selected",
            text: "All",
            attrs: { "data-tab": "all" },
        }),
        createElement("button", {
            className: "todos-panel__tab",
            text: "Active",
            attrs: { "data-tab": "active" },
        }),
        createElement("button", {
            className: "todos-panel__tab",
            text: "Completed",
            attrs: { "data-tab": "completed" },
        }),
    ];

    const itemsLeft = createElement("p", {
        className: "todos-panel__text",
        text: "0 items left",
    });

    const tabs = createElement("div", {
        className: "todos-panel__tabs",
        children: tabBtns,
    });

    const clearBtn = createElement("p", {
        className: "todos-panel__clear-btn todos-panel__text",
        text: "Clear Completed",
    });

    const header = createElement("div", {
        className: "todos-panel__header",
        children: [itemsLeft, tabs, clearBtn],
    });

    pubsub.subscribe("todos:list-updated", (newList) => {
        const activeTodos = newList.filter((todo) => !todo.isCompleted);
        itemsLeft.textContent = `${activeTodos.length} items left`;
    });

    return header;
}

function createList() {
    const list = createElement("ul", {
        className: "todos-panel__list",
    });

    pubsub.subscribe("todos:list-updated", (newList) => {
        list.innerHTML = "";

        newList.forEach((todo) => {
            const { id, description, isCompleted } = todo;

            const todoEl = createTodo(id, description, isCompleted);
            list.appendChild(todoEl);
        });
    });

    return list;
}

export default function createTodosPanel() {
    const tabsBar = createTabsBar();
    const listContainer = createElement("div", {
        className: "todos-panel__inner",
        children: [createHeader(), createList()],
    });

    const todosPanel = createElement("div", {
        className: "todos-panel todos-panel_empty",
        children: [tabsBar, listContainer],
    });

    pubsub.subscribe("todos:list-updated", (newList) => {
        if (newList.length > 0) {
            todosPanel.classList.remove("todos-panel_empty");
        } else {
            todosPanel.classList.add("todos-panel_empty");
        }
    });

    return todosPanel;
}
