import { createElement } from '../render.js';

const createNoTaskTemplate = () => /*html*/ `
  <p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>
`;

export default class NoTaskView {
  #element = null;

  get template() {
    return createNoTaskTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
