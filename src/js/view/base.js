/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
// get all elements

export const el = {
  // form
  searchForm: document.querySelector('.search'),

  // input
  searchInput: document.querySelector('.search__field'),

  // recipes list
  recipesList: document.querySelector('.results__list'),

  // results div
  searchRes: document.querySelector('.results'),

  searchResPage: document.querySelector('.results__pages'),

  recipes: document.querySelector('.recipe'),

  shoppingList: document.querySelector('.shopping__list')
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export const renderLoader = parent => {
  const loader = `
    <div class='loader'>
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const removeLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
