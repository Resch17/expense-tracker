import { getCategories, useCategories } from './CategoryProvider.js';

const eventHub = document.querySelector('.container');
const selectTarget = document.querySelector('#categorySelectContainer');

eventHub.addEventListener('change', (evt) => {
  if (evt.target.id === 'categorySelect') {
    const customEvent = new CustomEvent('categoryChosen', {
      detail: {
        categoryThatWasChosen: parseInt(evt.target.value),
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});

const render = (categoryArray) => {
  selectTarget.innerHTML = `
  <select class="dropdown" id="categorySelect">
    <option value="0">Please select a category...</option>
    ${categoryArray
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(
        (category) => `<option value="${category.id}">${category.name}</option>`
      )
      .join('')}
  </select>
  `;
};

export const selectList = () => {
  getCategories().then(() => {
    const categories = useCategories();
    render(categories);
  });
};
