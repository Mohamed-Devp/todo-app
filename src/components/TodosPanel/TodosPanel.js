import "./TodosPanel.css";

import pubsub from "../../pubsub.js";
import todos from "../../todos.js";
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

    pubsub.subscribe("tabs:tab-changed", (newTab) => {
        tabBtns.forEach((tabBtn) => {
            const tab = tabBtn.dataset.tab;

            tabBtn.classList.remove("todos-panel__tab_selected");
            if (tab === newTab) {
                tabBtn.classList.add("todos-panel__tab_selected");
            }
        });
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

    tabs.addEventListener("click", (e) => {
        const newTab = e.target.dataset.tab;
        pubsub.publish("tabs:tab-changed", newTab);
    });

    pubsub.subscribe("todos:list-updated", (newList) => {
        const activeTodos = newList.filter((todo) => !todo.isCompleted);
        itemsLeft.textContent = `${activeTodos.length} items left`;
    });

    pubsub.subscribe("tabs:tab-changed", (newTab) => {
        tabBtns.forEach((tabBtn) => {
            const tab = tabBtn.dataset.tab;

            tabBtn.classList.remove("todos-panel__tab_selected");
            if (tab === newTab) {
                tabBtn.classList.add("todos-panel__tab_selected");
            }
        });
    });

    return header;
}

function createList() {
    let activeTab = "all";

    const list = createElement("ul", {
        className: "todos-panel__list",
    });

    const updateListView = () => {
        list.innerHTML = "";

        let filteredList = todos.getTodos(activeTab);
        filteredList.forEach((todo) => {
            const { id, description, isCompleted } = todo;
            list.appendChild(createTodo(id, description, isCompleted));
        });
    };

    pubsub.subscribe("todos:list-updated", updateListView);

    pubsub.subscribe("tabs:tab-changed", (newTab) => {
        activeTab = newTab;
        updateListView();
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

    tabsBar.addEventListener("click", (e) => {
        const newTab = e.target.dataset.tab;
        pubsub.publish("tabs:tab-changed", newTab);
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
