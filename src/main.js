import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';
import NewTaskButtonView from './view/new-task-button-view.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import TaskModel from './model/tasks-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');
const taskModel = new TaskModel();
const boardPresenter = new BoardPresenter(siteMainElement, taskModel);
const filters = generateFilter();

render(new NewTaskButtonView(), siteHeaderElement);
render(new FilterView(filters), siteMainElement);

boardPresenter.init();
