import { useCategories } from "./CategoryProvider.js";

export const ExpenseRow = (expenseObject) => {
  let categories = useCategories();
  let thisCategory = categories.find((category)=>category.id === expenseObject.categoryId)

  return `
    <tr id="${expenseObject.id}">
      <td>${expenseObject.date}</td>
      <td>${thisCategory.name}</td>
      <td>${expenseObject.vendor}</td>
      <td>$${expenseObject.amount}</td>
      <td><i class="fas fa-edit" id="editExpense--${expenseObject.id}"></i></td>
      <td><i class="fas fa-trash-alt" id="deleteExpense--${expenseObject.id}"></i></td>
    </tr>
  `
}