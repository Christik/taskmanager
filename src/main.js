import NewTaskButtonView from './view/new-task-button-view';
import { render } from './render';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

render(new NewTaskButtonView(), siteHeaderElement);
