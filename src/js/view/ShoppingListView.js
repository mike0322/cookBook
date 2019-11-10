/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable node/no-unsupported-features/es-syntax */
import { el } from './base';

export const renderShopping = item => {
  const markUp = `
        <li class="shopping__item" data-itemId=${item.id}>
            <div class="shopping__count">
                <input min="0.1" class="shopping__count-value" type="number" value="${item.count}" step="${item.count}">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

  el.shoppingList.insertAdjacentHTML('beforeend', markUp);
};

export const deleteShopping = id => {
  // 使用 dataset 選擇 elements，只需用中括號將 class name 包起來即可
  const item = document.querySelector(`[data-itemId=${id}]`);
  item.parentElement.removeChild(item);
};
