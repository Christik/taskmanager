import { createElement } from '../render.js';
import { isTaskRepeating, humanizeTaskDueDate } from '../utils.js';
import { COLORS } from '../const.js';

const createTaskEditDateTemplate = (dueDate) => /*html*/ `
  <button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${(dueDate === null) ? 'no' : 'yes'}</span>
  </button>

  ${(dueDate !== null) ?
    `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${humanizeTaskDueDate(dueDate)}"
        />
      </label>
    </fieldset>`
    : ''}
`;

const createTaskEditRepeatingTemplate = (repeats) => /*html*/ `
  <button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${isTaskRepeating(repeats) ? 'yes' : 'no'}</span>
  </button>

  ${isTaskRepeating(repeats) ? `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
    ${Object.entries(repeats).map(([day, isRepeat]) => `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-4"
        name="repeat"
        value="${day}"
        ${isRepeat ? 'checked' : ''}
      />
      <label class="card__repeat-day" for="repeat-${day}-4"
        >${day}</label
      >
      `).join('')}
    </div>
  </fieldset>` : ''}
`;

const createTaskEditColorsTemplate = () => COLORS.map((color) => /*html*/ `
  <input
    type="radio"
    id="color-${color}-4"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
  />
  <label
    for="color-${color}-4"
    class="card__color card__color--${color}"
    >${color}</label
  >
`).join('');

const createTaskEditTemplate = (task = {}) => {
  const {
    color = 'black',
    description = '',
    dueDate = null,
    isArchived = false,
    isFavorite = false,
    repeatingDays = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
  } = task;

  const repeatingClassName = isTaskRepeating(repeatingDays) ? 'card--repeat' : '';

  return /*html*/ `
    <article class="card card--edit card--yellow ${repeatingClassName}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >This is example of task edit. You can set date and chose repeating days and color.</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${createTaskEditDateTemplate(dueDate)}
                ${createTaskEditRepeatingTemplate(repeatingDays)}
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${createTaskEditColorsTemplate()}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
  `;
};

export default class TaskEditView {
  #element = null;

  get template() {
    return createTaskEditTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
