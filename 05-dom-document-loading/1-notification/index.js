export default class NotificationMessage {
    static lastShownComponent;
    message;
    duration;
    type;

    constructor(message, { duration = 1000, type = 'success' } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        this.element = this.createElement(this.createTemplate());
    }

    createTemplate() {
        return `
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">Notification</div>
                <div class="notification-body">
                    ${this.message}
                </div>
            </div>
        `;
    }

    createElement(template) {
        const element = document.createElement('div');

        element.classList.add(...["notification", this.type]);
        element.style = `--value:${this.duration / 1000}s`;
        element.innerHTML = template;

        return element;
    }

    createTimer = () => {
        this.timerId = setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    show(targetElement) {
        this.createTimer();

        if (NotificationMessage.lastShownComponent) {
            NotificationMessage.lastShownComponent.destroy();
        }

        NotificationMessage.lastShownComponent = this;
        
        if (targetElement) targetElement.append(this.element);
        else document.body.append(this.element);
    }

    hide() {
        this.remove();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        clearTimeout(this.timerId);
        this.remove();
    }
}