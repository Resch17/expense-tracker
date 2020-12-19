import { editExpense, useExpenses } from './ExpenseProvider.js';

const eventHub = document.querySelector('.container');

const editDialog = document.querySelector('#editDialog');
const editId = document.querySelector('#editId');
const amountInput = document.querySelector('#amountInputEdit');
const categorySelect = document.querySelector('#categorySelectEdit');
let categoryId;
const vendorInput = document.querySelector('#vendorInputEdit');
const dateInput = document.querySelector('#dateInputEdit');
const editSaveButton = document.querySelector('#submitEdit');

const saveEdit = () => {
  if (
    amountInput.value > 0 &&
    !isNaN(amountInput.value) &&
    vendorInput.value !== ''
  ) {
    const editedExpense = {
      amount: amountInput.value,
      categoryId: parseInt(categorySelect.value),
      vendor: vendorInput.value,
      date: dateInput.value,
      dateEntered: new Date(),
      id: editId.value
    };

    editExpense(editedExpense);
  } else {
    alert('Please Use Valid Numbers and Stuff');
  }
};

document.querySelector('#closeDialog').addEventListener('click', () => {
  editDialog.close();
});

window.onclick = function (event) {
  if (event.target === editDialog) {
    editDialog.close();
  }
};

eventHub.addEventListener('editExpenseClicked', (evt) => {
  editDialog.showModal();
  const idToEdit = evt.detail.expenseToEdit;
  const expenses = useExpenses();
  const eventObject = expenses.find((e) => e.id === parseInt(idToEdit));
  editId.value = parseInt(idToEdit);
  amountInput.value = eventObject.amount;
  categorySelect.value = `${eventObject.categoryId}`;
  vendorInput.value = eventObject.vendor;
  dateInput.value = eventObject.date;
});

editSaveButton.addEventListener('click', () => {
  saveEdit();
  editDialog.close();
});
