import pubsub from "./pubsub.js";

class Todos {
    constructor() {
        this.list = [];
    }

    getTodos(filter = "all") {
        if (filter === "active") {
            return this.list.filter((todo) => !todo.isCompleted);
        } else if (filter === "completed") {
            return this.list.filter((todo) => todo.isCompleted);
        } else {
            return this.list;
        }
    }

    addTodo(description, isCompleted) {
        const id = crypto.randomUUID();

        const todo = { id, description, isCompleted };
        this.list.push(todo);

        pubsub.publish("todos:list-updated", this.list);
    }

    removeTodo(id) {
        const filteredList = this.list.filter((todo) => todo.id !== id);
        this.list = filteredList;

        pubsub.publish("todos:list-updated", this.list);
    }

    updateTodo(id, updatedTodo) {
        const updatedList = this.list.map((todo) => {
            if (todo.id === id) {
                Object.entries(updatedTodo).forEach(([name, value]) => {
                    todo[name] = value;
                });
            }

            return todo;
        });
        this.list = updatedList;

        pubsub.publish("todos:list-updated", this.list);
    }

    clearCompleted() {
        const filteredList = this.list.filter((todo) => !todo.isCompleted);
        this.list = filteredList;

        pubsub.publish("todos:list-updated", this.list);
    }
}

export default new Todos();
