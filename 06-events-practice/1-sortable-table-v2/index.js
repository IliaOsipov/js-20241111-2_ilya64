import SortableTable from "../../05-dom-document-loading/2-sortable-table-v1/index.js"

export default class SortableTableV2 extends SortableTable {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {id: 'title', order: 'asc'}, isSortLocally = true) {
    super(headersConfig, data);

    //console.log(this.element);

    this.sortField = sorted["id"];
    this.sortOrder = sorted["order"];
    this.isSortLocally = isSortLocally;
    this.arrowElement = this.createArrowElement();

    this.createListeners();

    this.sort(this.sortField, this.sortOrder);
  }

  createArrowElement() {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = this.createArrowTemplate();
    return tempElement.firstElementChild;
  }

  createArrowTemplate() {
    return (
      `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
      </span>`
    );
  }

  handleHeaderCellClick = (e) => {
    const cellElement = e.target.closest('.sortable-table__cell');
    //const cellElement = e.target.closest('[data-sortable="true"]');
    if (!cellElement) {
      return;
    }

    if (cellElement.dataset.sortable != 'true') {
      return;
    }

    this.sortField = cellElement.dataset.id;
    this.sortOrder = (this.sortOrder == 'asc') ? 'desc' : 'asc';

    this.sort(this.sortField, this.sortOrder);
  }

  headerPointerDown(cellElement) {
    if (!cellElement) {
      return;
    }

    cellElement.appendChild(this.arrowElement);
  }

  sort(sortField, sortOrder) {
    const column = this.element.querySelector(`[data-id="${sortField}"]`);

    this.headerPointerDown(column);

    if (this.isSortLocally) {
      this.sortOnClient(sortField, sortOrder);
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient(sortField, sortOrder) {
    super.sort(sortField, sortOrder);
  }

  sortOnServer() {

  }

  createListeners() {
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderCellClick);
  }

  destroyListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.handleHeaderCellClick);
  }

  destroy() {
    super.destroy();
    this.destroyListeners();
  }
}
