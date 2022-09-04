import { remove, render, replace } from '../framework/render.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import { isEscKeydown } from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TaskPresenter {
  #task = null;
  #mode = Mode.DEFAULT;

  #taskComponent = null;
  #taskEditComponent = null;
  #taskListContainer = null;

  #changeData = null;
  #changeMode = null;

  constructor(taskListContainer, changeData, changeMode) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (task) => {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;

    this.#taskComponent = new TaskView(this.#task);
    this.#taskEditComponent = new TaskEditView(this.#task);

    this.#taskComponent.setEditClickHandler(this.#handleEditClick);
    this.#taskComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#taskComponent.setArchiveClickHandler(this.#handleArchiveClick);
    this.#taskEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#taskComponent, this.#taskListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#taskComponent, prevTaskComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  };

  destroy = () => {
    remove(this.#taskComponent);
    remove(this.#taskEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    this.#taskListContainer.replaceChild(
      this.#taskEditComponent.element,
      this.#taskComponent.element
    );
    this.#changeMode();
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #replaceFormToCard = () => {
    this.#taskListContainer.replaceChild(
      this.#taskComponent.element,
      this.#taskEditComponent.element
    );
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #escKeydownHandler = (evt) => {
    if (isEscKeydown(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#task, isFavorite: !this.#task.isFavorite});
  };

  #handleArchiveClick = () => {
    this.#changeData({...this.#task, isArchived: !this.#task.isArchived});
  };

  #handleFormSubmit = (task) => {
    this.#changeData(task);
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };
}
