import { createElement } from '../render';

const createTaskListTemplate = () => '<div class="board__tasks"></div>';

export default class TaskListView {
  getTemplate() {
    return createTaskListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
