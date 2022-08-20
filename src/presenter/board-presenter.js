import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import { render } from '../render.js';
import { isEscKeydown } from '../utils.js';

export default class BoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = null;
  #boardComponent = new BoardView();
  #taskListComponent = new TaskListView();

  init(boardContainer, taskModel) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#boardTasks = this.#taskModel.tasks;

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#taskListComponent, this.#boardComponent.element);

    for (let i = 0; i < this.#boardTasks.length; i++) {
      this.#renderTask(this.#boardTasks[i]);
    }

    render(new LoadMoreButtonView(), this.#boardComponent.element);
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
}
