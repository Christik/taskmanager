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
    render(new SortView(), this.boardComponent.getElement());
    render(this.taskListComponent, this.boardComponent.getElement());
    render(new TaskEditView(), this.taskListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TaskView(), this.taskListComponent.getElement());
    }

    render(new LoadMoreButtonView(), this.boardComponent.getElement());
  }
}
