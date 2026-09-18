class PubSub {
    constructor() {
        this.events = {};
        this.currentId = 0;
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        const id = this.currentId++;

        const subscription = { id, callback };
        this.events[event].push(subscription);
    }

    unsubcsribe(event, id) {
        if (!this.events[event]) return;

        const filteredEvents = this.events.filter((subscription) => {
            return subscription.id !== id;
        });
        this.events = filteredEvents;
    }

    publish(event, data) {
        if (!this.events[event]) return;

        this.events[event].forEach((subscription) => {
            subscription.callback(data);
        });
    }
}

export default new PubSub();
