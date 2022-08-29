import { render } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoTaskView from '../view/no-task-view.js';
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

  constructor(boardContainer, taskModel) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
  }

  init() {
    this.#boardTasks = this.#taskModel.tasks;
    this.#renderBoard();
  }

  #renderTask(task) {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView();

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

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeydown);
    });

    taskEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeydown);
    });

    render(taskComponent, this.#taskListComponent.element);
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardTasks.every((task) => task.isArchived)) {
      render(new NoTaskView(), this.#boardComponent.element);
    } else {
      render(new SortView(), this.#boardComponent.element);
      render(this.#taskListComponent, this.#boardComponent.element);

      for (let i = 0; i < Math.min(this.#boardTasks.length, TASK_COUNT_PER_STEP); i++) {
        this.#renderTask(this.#boardTasks[i]);
      }

      if (this.#boardTasks.length > TASK_COUNT_PER_STEP) {
        render(this.#loadMoreButtonComponent, this.#boardComponent.element);

        this.#loadMoreButtonComponent.setClickHandler(
          this.#handleLoadMoreButtonClick
        );
      }
    }
  }

  #handleLoadMoreButtonClick = () => {
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
