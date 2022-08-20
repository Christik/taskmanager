import BoardView from '../view/board-view';
import SortView from '../view/sort-view';
import TaskListView from '../view/task-list';
import TaskView from '../view/task-view';
import TaskEditView from '../view/task-edit-view';
import LoadMoreButtonView from '../view/load-more-button-view';
import { render } from '../render';

export default class BoardPresenter {
  boardComponent = new BoardView();
  taskListComponent = new TaskListView();

  init(boardContainer) {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.element);
    render(this.taskListComponent, this.boardComponent.element);
    render(new TaskEditView(), this.taskListComponent.element);

    for (let i = 0; i < 3; i++) {
      render(new TaskView(), this.taskListComponent.element);
    }

    render(new LoadMoreButtonView(), this.boardComponent.element);
  }
}
