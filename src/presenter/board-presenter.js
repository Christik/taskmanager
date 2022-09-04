import { remove, render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoTaskView from '../view/no-task-view.js';
import TaskPresenter from './task-presenter.js';
import { updateItem } from '../utils/common.js';

const TASK_COUNT_PER_STEP = 8;

export default class BoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = [];
  #taskPresenter = new Map();

  #boardComponent = new BoardView();
  #sortComponent = new SortView();
  #noTaskComponent = new NoTaskView();
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

  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderTask = (task) => {
    const taskPresenter = new TaskPresenter(
      this.#taskListComponent.element,
      this.#handleTaskChange
    );
    taskPresenter.init(task);
    this.#taskPresenter.set(task.id, taskPresenter);
  };

  #clearTaskList = () => {
    this.#taskPresenter.forEach((presenter) => presenter.destroy());
    this.#taskPresenter.clear();
    this.#renderedTaskCount = TASK_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  };

  #renderTasks = (from, to) => {
    this.#boardTasks
      .slice(from, to)
      .forEach((task) => this.#renderTask(task));
  };

  #renderNoTasks = () => {
    render(this.#noTaskComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderLoadMoreButton = () => {
    render(this.#loadMoreButtonComponent, this.#boardComponent.element);

    this.#loadMoreButtonComponent.setClickHandler(
      this.#handleLoadMoreButtonClick
    );
  };

  #renderTaskList = () => {
    render(this.#taskListComponent, this.#boardComponent.element);
    this.#renderTasks(0, Math.min(this.#boardTasks.length, TASK_COUNT_PER_STEP));

    if (this.#boardTasks.length > TASK_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardTasks.every((task) => task.isArchived)) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderTaskList();
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderTasks(this.#renderedTaskCount, this.#renderedTaskCount + TASK_COUNT_PER_STEP);

    this.#renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this.#renderedTaskCount >= this.#boardTasks.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #handleTaskChange = (updatedTask) => {
    this.#boardTasks = updateItem(this.#boardTasks, updatedTask);
    this.#taskPresenter.get(updatedTask.id).init(updatedTask);
  };
}
