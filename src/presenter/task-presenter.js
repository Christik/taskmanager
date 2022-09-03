import { remove, render, replace } from '../framework/render.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import { isEscKeydown } from '../utils/common.js';

export default class TaskPresenter {
  #task = null;
  #taskComponent = null;
  #taskEditComponent = null;
  #taskListContainer = null;

  constructor(taskListContainer) {
    this.#taskListContainer = taskListContainer;
  }

  init = (task) => {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;

    this.#taskComponent = new TaskView(this.#task);
    this.#taskEditComponent = new TaskEditView();

    this.#taskComponent.setEditClickHandler(this.#handleEditClick);

    this.#taskEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#taskComponent, this.#taskListContainer);
      return;
    }

    if (this.#taskListContainer.contains(prevTaskComponent.element)) {
      replace(this.#taskComponent, prevTaskComponent);
    }

    if (this.#taskListContainer.contains(prevTaskEditComponent.element)) {
      replace(this.#taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  };

  destroy = () => {
    remove(this.#taskComponent);
    remove(this.#taskEditComponent);
  };

  #replaceCardToForm = () => {
    this.#taskListContainer.replaceChild(
      this.#taskEditComponent.element,
      this.#taskComponent.element
    );
  };

  #replaceFormToCard = () => {
    this.#taskListContainer.replaceChild(
      this.#taskComponent.element,
      this.#taskEditComponent.element
    );
  };

  #escKeydownHandler = (evt) => {
    if (isEscKeydown(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };
}