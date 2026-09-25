import "./TodosPanel.css";

import pubsub from "../../pubsub.js";
import todos from "../../todos.js";
import { createElement } from "../../utils.js";
import createTodo from "../../components/Todo/Todo.js";

function createTabBtn(tab, isSelected) {
    const tabBtn = createElement("button", {
        className: isSelected
            ? "todos-panel__tab todos-panel__tab_selected"
            : "todos-panel__tab",
        text: tab,
    });

    const onTabBtnClick = () => {
        pubsub.publish("tabs:tab-changed", tab);
    };

    tabBtn.addEventListener("click", onTabBtnClick);

    pubsub.subscribe("tabs:tab-changed", (newTab) => {
        if (tab === newTab) {
            tabBtn.classList.add("todos-panel__tab_selected");
        } else {
            tabBtn.classList.remove("todos-panel__tab_selected");
        }
    });

    return tabBtn;
}

function createTabsBar() {
    const tabsBar = createElement("div", {
        className: "todos-panel__tabs-bar todos-panel__container",
        children: [
            createTabBtn("All", true),
            createTabBtn("Active", false),
            createTabBtn("Completed", false),
        ],
    });

    return tabsBar;
}

function createHeader() {
    const itemsLeft = createElement("p", {
        className: "todos-panel__text",
        text: "0 items left",
    });

    const tabs = createElement("div", {
        className: "todos-panel__tabs",
        children: [
            createTabBtn("All", true),
            createTabBtn("Active", false),
            createTabBtn("Completed", false),
        ],
    });

    const clearBtn = createElement("button", {
        className: "todos-panel__clear-btn todos-panel__text",
        text: "Clear Completed",
    });

    const header = createElement("div", {
        className: "todos-panel__header",
        children: [itemsLeft, tabs, clearBtn],
    });

    clearBtn.addEventListener("click", () => {
        todos.clearCompleted();
    });

    pubsub.subscribe("todos:list-updated", (newList) => {
        const activeTodos = newList.filter((todo) => !todo.isCompleted);
        itemsLeft.textContent = `${activeTodos.length} items left`;
    });

    return header;
}

function createList() {
    let activeTab = "All";

    const list = createElement("ul", {
        className: "todos-panel__list",
    });

    const updateListView = () => {
        list.innerHTML = "";

        const filter = activeTab.toLowerCase();
        let filteredList = todos.getTodos(filter);

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
        className: "todos-panel__container",
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
