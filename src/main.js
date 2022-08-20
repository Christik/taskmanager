import NewTaskButtonView from './view/new-task-button-view.js';
import FilterView from './view/filter-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TaskModel from './model/tasks-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');
const taskModel = new TaskModel();
const boardPresenter = new BoardPresenter(siteMainElement, taskModel);

render(new NewTaskButtonView(), siteHeaderElement);
render(new FilterView(), siteMainElement);

boardPresenter.init();
