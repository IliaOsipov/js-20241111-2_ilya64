class Tooltip {
  static instance;

  constructor () {
      if (Tooltip.instance) {
          return Tooltip.instance;
      }
      
      Tooltip.instance = this;
  }

  initialize() {
    document.addEventListener('pointerover', this.handlePointerOver);
    document.addEventListener('pointerout', this.handlePointerOut);
  }

  render() {
    this.element = document.createElement('div');
    
    this.element.className = ('tooltip');
    this.element.innerHTML = this.createTemplate();
    
    document.body.append(this.element);
    document.addEventListener('pointermove', this.handlePointerMove);
  }

  createTemplate() {
    return `${this.currentTooltipText}`;
  }

  handlePointerOver = e => {
    if (e.target.dataset.tooltip === undefined) {
      return;
    }

    this.currentTooltipText = e.target.dataset.tooltip;
    this.render();
  }

  handlePointerOut = () => {
    if (!this.element) {
      return;
    }

    this.element.remove();
    this.element = null;
  }

  handlePointerMove = e => {
    if (!this.element) {
      return;
    }

    this.element.style.top = `${e.clientY + 10}px`;
    this.element.style.left = `${e.clientX + 10}px`;
  }

  remove() {
    if (!this.element) {
      return;
    }

    this.element.remove();
  }

  destroy() {
    this.remove();

    document.removeEventListener("pointerover", this.handlePointerOver);
    document.removeEventListener("pointerout", this.handlePointerOut);
    document.removeEventListener("pointermove", this.handlePointerMove);
  }
}

export default Tooltip;
