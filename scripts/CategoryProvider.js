let categories = [
  {
    id: 1,
    name: "Food"
  },
  {
    id: 2,
    name: "Personal"
  },
  {
    id: 3,
    name: "Charity"
  },
  {
    id: 4,
    name: "Loans"
  },
  {
    id: 5,
    name: "Gas"
  }
];

// export const getCategories = () => {
//   return fetch('http://localhost:8089/categories')
//     .then((res) => res.json())
//     .then((parsedCategories) => {
//       categories = parsedCategories;
//     });
// };

export const useCategories = () => categories.slice();
