import { getExpenses, useExpenses, deleteExpense } from './ExpenseProvider.js';
import { ExpenseRow } from './ExpenseRow.js';

const eventHub = document.querySelector('.container');
const listTarget = document.querySelector('.expense-target');
const totalTarget = document.querySelector('#totalTarget')

let expenses = [];

const expenseList = () => {
  getExpenses().then(() => {
    expenses = useExpenses();
    listTarget.innerHTML = expenses
      .map((expense) => ExpenseRow(expense))
      .join('');
    let expenseTotal = expenses.map((e) => parseFloat(e.amount)).reduce((a, b) => a + b, 0);
    totalTarget.innerHTML = `$${expenseTotal}`;
  });
};

expenseList();

eventHub.addEventListener('expensesStateChanged', expenseList);

eventHub.addEventListener('deleteExpenseClicked', (evt) => {
  const idToDelete = evt.detail.expenseToDelete;
  deleteExpense(idToDelete);
});

let expenseTotal = expenses.map((e) => e.amount).reduce((a, b) => a + b, 0);
console.log(expenseTotal);
