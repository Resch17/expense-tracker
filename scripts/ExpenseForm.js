import { saveExpense, useExpenses } from './ExpenseProvider.js';

const eventHub = document.querySelector('.container');

const amountInput = document.querySelector('#amountInput');
let categorySelect = document.querySelector('#categorySelect');
let categoryId;
const vendorInput = document.querySelector('#vendorInput');
const dateInput = document.querySelector('#dateInput');
const submitButton = document.querySelector('#submitExpense')

// validation logic

const buttonStatus = {
  isAmountValid: false,
  isCategoryValid: false,
  isVendorValid: false,
  isDateValid: false,
};

const buttonEnabler = () => {
  if (
    buttonStatus.isAmountValid &&
    buttonStatus.isCategoryValid &&
    buttonStatus.isVendorValid &&
    buttonStatus.isDateValid
  ) {
    submitButton.disabled = false;
  }
};

amountInput.addEventListener('keyup', () => {
  let customEvent = new CustomEvent('amountEntered');
  eventHub.dispatchEvent(customEvent);
});

vendorInput.addEventListener('keyup', () => {
  let customEvent = new CustomEvent('vendorEntered');
  eventHub.dispatchEvent(customEvent);
});

dateInput.addEventListener('input', () => {
  let customEvent = new CustomEvent('dateEntered');
  eventHub.dispatchEvent(customEvent);
});

eventHub.addEventListener('amountEntered', () => {
  if (amountInput.value > 0 && !isNaN(amountInput.value)) {
    buttonStatus.isAmountValid = true;
    buttonEnabler();
  }
});

eventHub.addEventListener('categoryChosen', (evt) => {
  if (evt.detail.categoryThatWasChosen > 0) {
    categoryId = evt.detail.categoryThatWasChosen
    buttonStatus.isCategoryValid = true;
    buttonEnabler();
  }
});

eventHub.addEventListener('vendorEntered', () => {
  if (vendorInput.value !== '') {
    buttonStatus.isVendorValid = true;
    buttonEnabler();
  }
});

eventHub.addEventListener('dateEntered', () => {
  buttonStatus.isDateValid = true;
  buttonEnabler();
});

// submit clicked

const submitExpense = () => {
  const newExpense = {
    amount: amountInput.value,
    categoryId: categoryId,
    vendor: vendorInput.value,
    date: dateInput.value,
    dateEntered: new Date(),
  };

  saveExpense(newExpense);
  amountInput.value = '';
  vendorInput.value = '';
  dateInput.value = '';
  categorySelect.value = '0';
};

submitButton.addEventListener('click', () => {
  submitExpense();
})

