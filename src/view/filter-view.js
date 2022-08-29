import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (name, count, isDisabled, isChecked) => /*html*/`
  <input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isDisabled ? 'disabled' : ''}
    ${isChecked ? 'checked' : ''}
  />
  <label
    for="filter__${name}"
    class="filter__label"
  >
    ${name}
    <span class="filter__${name}-count">${count}</span>
  </label>
`;

const createFilterTemplate = (filters) => {
  const itemTemplate = filters.map(
    (filter, index) => {
      const isDisabled = (filter.count === 0);
      const isChecked = (index === 0);

      return createFilterItemTemplate(
        filter.name,
        filter.count,
        isDisabled,
        isChecked
      );
    }
  ).join('');

  return /*html*/`
    <section class="main__filter filter container">
      ${itemTemplate}
    </section>
  `;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();

    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
