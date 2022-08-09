import NewTaskButtonView from './view/new-task-button-view';
import FilterView from './view/filter-view';
import { render } from './render';
import BoardPresenter from './presenter/board-presenter';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');
const boardPresenter = new BoardPresenter();

render(new NewTaskButtonView(), siteHeaderElement);
render(new FilterView(), siteMainElement);

boardPresenter.init(siteMainElement);
