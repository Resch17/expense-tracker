let categories = [];

export const getCategories = () => {
  return fetch('http://localhost:8088/categories')
    .then((res) => res.json())
    .then((parsedCategories) => {
      categories = parsedCategories;
    });
};

export const useCategories = () => categories.slice();
