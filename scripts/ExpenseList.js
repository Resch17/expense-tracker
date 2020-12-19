import { getExpenses, useExpenses, deleteExpense } from './ExpenseProvider.js';
import { ExpenseRow } from './ExpenseRow.js';

const eventHub = document.querySelector('.container');
const listTarget = document.querySelector('.expense-target');

let expenses = [];

const expenseList = () => {
  getExpenses().then(() => {
    expenses = useExpenses();
    listTarget.innerHTML = expenses
      .map((expense) => ExpenseRow(expense))
      .join('');
  });
};

expenseList();

eventHub.addEventListener('expensesStateChanged', expenseList);

eventHub.addEventListener('deleteExpenseClicked', (evt) => {
  const idToDelete = evt.detail.expenseToDelete;
  deleteExpense(idToDelete);
});
