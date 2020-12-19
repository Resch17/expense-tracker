import { getExpenses, useExpenses } from './ExpenseProvider.js';
import { ExpenseRow } from './ExpenseRow.js';

const eventHub = document.querySelector('.container');
const listTarget = document.querySelector('.expense-target');

export const expenseList = () => {
  getExpenses().then(() => {
    let expenses = useExpenses();
    listTarget.innerHTML = expenses.map((expense) => ExpenseRow(expense)).join('');
  });
};

eventHub.addEventListener('expensesStateChanged', expenseList());
