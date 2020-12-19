let expenses = [];
const expensesApi = 'http://localhost:8088/expenses';
const eventHub = document.querySelector('.container');

const dispatchStateChangeEvent = () => {
  const customEvent = new CustomEvent('expensesStateChanged');
  eventHub.dispatchEvent(customEvent);
};

export const getExpenses = () => {
  return fetch(expensesApi)
    .then((res) => res.json())
    .then((parsedExpenses) => {
      expenses = parsedExpenses;
    });
};

export const useExpenses = () => expenses.slice();

export const saveExpense = (expenseObject) => {
  return fetch(expensesApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseObject),
  })
    .then(getExpenses)
    .then(dispatchStateChangeEvent);
};

export const deleteExpense = (expenseId) => {
  return fetch(`${expensesApi}/${expenseId}`, {
    method: 'DELETE',
  })
    .then(getExpenses)
    .then(dispatchStateChangeEvent);
};
