import { useCategories } from './CategoryProvider.js';
const eventHub = document.querySelector('.container');

export const ExpenseRow = (expenseObject) => {
  let categories = useCategories();
  let thisCategory = categories.find(
    (category) => category.id === expenseObject.categoryId
  );

  return `
    <tr id="${expenseObject.id}">
      <td>${expenseObject.date}</td>
      <td>${thisCategory.name}</td>
      <td>${expenseObject.vendor}</td>
      <td>$${expenseObject.amount}</td>
      <td><i class="fas fa-edit editButton" id="editExpense--${expenseObject.id}"></i></td>
      <td><i class="fas fa-trash-alt deleteButton" id="deleteExpense--${expenseObject.id}"></i></td>
    </tr>
  `;
};

eventHub.addEventListener('click', (evt) => {
  if (!evt.target.id.startsWith('editExpense--')) {
    return;
  }

  const [unusedPrefix, editId] = evt.target.id.split('--');
  const customEvent = new CustomEvent('editExpenseClicked', {
    detail: {
      expenseToEdit: editId,
    },
  });
  eventHub.dispatchEvent(customEvent);
});

eventHub.addEventListener('click', (evt) => {
  if (!evt.target.id.startsWith('deleteExpense--')) {
    return;
  }

  const [unusedPrefix, deleteId] = evt.target.id.split('--');
  const customEvent = new CustomEvent('deleteExpenseClicked', {
    detail: {
      expenseToDelete: deleteId,
    },
  });
  eventHub.dispatchEvent(customEvent);
});
