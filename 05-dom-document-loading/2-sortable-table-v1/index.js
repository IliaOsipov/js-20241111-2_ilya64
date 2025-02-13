export default class SortableTable {
    subElements = {}

    constructor(headerConfig = [], data = []) {
        this.config = headerConfig;
        this.data = data;

        this.element = this.createElement(this.createTemplate());
        this.selectSubElements();
    }

    createTableHeaderTemplate() {
        return this.config.map(columnConfig => (
            `<div class="sortable-table__cell" data-id="${columnConfig['id']}" data-sortable="${columnConfig['sortable']}">
                <span>${columnConfig['title']}</span>
            </div>`
        )).join('');
    }

    createTableBodyCellTemplate(product, columnConfig) {
        const fieldId = columnConfig['id'];

        return `
            <div class="sortable-table__cell">${product[fieldId]}</div>
        `;
    }

    createTableBodyRowTemplate(product) {
        return `
            <a href="/products/3d-ochki-optoma-zf2300" class="sortable-table__row">
                ${this.config.map(columnConfig =>
                this.createTableBodyCellTemplate(product, columnConfig)
            ).join('')}
            </a>
        `;
    }

    createTableBodyTemplate() {
        return this.data.map(product => (
            this.createTableBodyRowTemplate(product)
        )).join('');
    }

    createTemplate() {
        return `
            <div data-element="header" class="sortable-table__header sortable-table__row">
                ${this.createTableHeaderTemplate()}
            </div>
            <div data-element="body" class="sortable-table__body">
                ${this.createTableBodyTemplate()}
            </div>
            <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
            <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                <div>
                    <p>No products satisfies your filter criteria</p>
                    <button type="button" class="button-primary-outline">Reset all filters</button>
                </div>
            </div>
        `;
    }

    sort(field, sortOrder) {
        const column = this.element.querySelector(`[data-id="${field}"]`);

        column.dataset.order = sortOrder;

        if (this.data.length > 0) {
            switch (typeof this.data[0][field]) {
                case "number": {
                    this.data = this.data.sort((a, b) => a[field] - b[field]);

                    break;
                }
                case "string": {
                    this.data = this.data.sort((a, b) => a[field].localeCompare(b[field], ["ru", "en"], { caseFirst: 'upper' }));

                    break;
                }
            }

            if (sortOrder == 'desc') {
                this.data.reverse();
            }

            const table_body = this.element.querySelector(`[data-element="body"]`);
            table_body.innerHTML = this.createTableBodyTemplate();
            this.selectSubElements();
        }
    }

    createElement(template) {
        const element = document.createElement('div');

        element.className = "sortable-table";
        element.innerHTML = template;

        return element;
    }

    selectSubElements() {
        this.element.querySelectorAll('[data-element]').forEach(element => {
            this.subElements[element.dataset.element] = element;
        });
    }

    destroy() {
        this.element.remove();
    }
}

