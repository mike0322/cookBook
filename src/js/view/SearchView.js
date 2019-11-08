/* eslint-disable node/no-unsupported-features/es-syntax */
import { el } from './base';

// get search input value
export const getInput = () => el.searchInput.value;

// clear results
export const clearResults = () => {
  el.recipesList.innerHTML = '';
  el.searchResPage.innerHTML = '';
};

// clear input value (只要執行就好，不需要返回任何東西，因此用花括號包起來)
export const clearInput = () => {
  el.searchInput.value = '';
};

// recipe title 字數限制（控制在一行）
export const limitRecipeTitle = (title, limit = 16) => {
  if (title.length > limit) {
    const newTitle = [];
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return `${newTitle.join(' ')}...`;
  }

  return `${title}...`;
};

const createBtn = (page, type) => {
  return `
        <button class="btn-inline results__btn--${type}"data-goto=${
    type === 'prev' ? page - 1 : page + 1
  }>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${
                  type === 'prev' ? 'left' : 'right'
                }"></use>
            </svg>
        </button>
    `;
};

export const renderBtn = (page, recipesTotal, resPerNum) => {
  const pages = Math.ceil(recipesTotal / resPerNum);
  let button;
  // 第一頁：one button (right)
  if (page === 1 && pages > 1) {
    button = createBtn(page, 'next');

    // 中間：two button (both)
  } else if (page < pages && pages > 1) {
    button = `
            ${createBtn(page, 'prev')}
            ${createBtn(page, 'next')}
        `;
    // 最後一頁： one button(left)
  } else if (page === pages) {
    button = createBtn(page, 'prev');
  }

  el.searchResPage.insertAdjacentHTML('afterbegin', button);
};

export const renderRecipe = recipe => {
  const markUp = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

  el.recipesList.insertAdjacentHTML('beforeend', markUp);
};

// 遍歷 state.search.recipes 後，每個 item 當成參數丟給 renderRecipe 執行
export const renderResults = (results, page = 1, resPerNum = 10) => {
  const start = (page - 1) * resPerNum;
  const end = page * resPerNum;
  results.slice(start, end).forEach(renderRecipe);
  renderBtn(page, results.length, resPerNum);
};
