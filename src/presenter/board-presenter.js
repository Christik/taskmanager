import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import { render } from '../render.js';

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
    const component = new TaskView(task);

    render(component, this.#taskListComponent.element);
  }
}
