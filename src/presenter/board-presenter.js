import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import { render } from '../render.js';
import { isEscKeydown } from '../utils.js';

const TASK_COUNT_PER_STEP = 8;

export default class BoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = [];

  #boardComponent = new BoardView();
  #taskListComponent = new TaskListView();
  #loadMoreButtonComponent = new LoadMoreButtonView();

  #renderedTaskCount = TASK_COUNT_PER_STEP;

  init(boardContainer, taskModel) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#boardTasks = this.#taskModel.tasks;

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#taskListComponent, this.#boardComponent.element);

    for (let i = 0; i < Math.min(this.#boardTasks.length, TASK_COUNT_PER_STEP); i++) {
      this.#renderTask(this.#boardTasks[i]);
    }

    if (this.#boardTasks.length > TASK_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, this.#boardComponent.element);

      this.#loadMoreButtonComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
    }
  }

  #renderTask(task) {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView();
    const editButtonElement = taskComponent.element.querySelector('.card__btn--edit');
    const saveButtonElement = taskEditComponent.element.querySelector('.card__save');

    const replaceCardToForm = () => {
      this.#taskListComponent.element.replaceChild(taskEditComponent.element, taskComponent.element);
    };

    const replaceFormToCard = () => {
      this.#taskListComponent.element.replaceChild(taskComponent.element, taskEditComponent.element);
    };

    const onEscKeydown = (evt) => {
      if (isEscKeydown(evt)) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    editButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeydown);
    });

    saveButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeydown);
    });

    render(taskComponent, this.#taskListComponent.element);
  }

  #handleLoadMoreButtonClick = (evt) => {
    evt.preventDefault();

    this.#boardTasks
      .slice(this.#renderedTaskCount, this.#renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => this.#renderTask(task));

    this.#renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this.#renderedTaskCount >= this.#boardTasks.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };
}
