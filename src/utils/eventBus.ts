type EventHandler = (data: any) => void;

class EventBus {
  private events: { [key: string]: EventHandler[] } = {};

  on(event: string, handler: EventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);

    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter((h) => h !== handler);
    };
  }

  emit(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach((handler) => handler(data));
    }
  }
}

const eventBus = new EventBus();
export default eventBus;
