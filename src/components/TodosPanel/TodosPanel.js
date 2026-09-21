import "./TodosPanel.css";

import { createElement } from "../../utils.js";

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

    return header;
}

function createList() {
    const list = createElement("ul", {
        className: "todos-panel__list",
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

    return todosPanel;
}
