/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable node/no-unsupported-features/es-syntax */
import { el } from './base';
import { limitRecipeTitle } from './SearchView';

export const toggleLikeBtn = isLike => {
  //<use href="img/icons.svg#icon-heart-outlined"></use>
  const iconString = isLike ? `icon-heart` : `icon-heart-outlined`;
  document
    .querySelector('.recipe__love use')
    .setAttribute(`href`, `img/icons.svg#${iconString}`);
};

export const toggleLikeList = numLike => {
  el.likeListBox.style.visibility = numLike ? 'visible' : 'hidden';
};

export const renderLike = like => {
  const markup = `
      <li>
          <a class="likes__link" href="#${like.id}">
              <figure class="likes__fig">
                  <img src="${like.img}" alt="${like.title}">
              </figure>
              <div class="likes__data">
                  <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                  <p class="likes__author">${like.author}</p>
              </div>
          </a>
      </li>
  `;

  el.likeList.insertAdjacentHTML('beforeend', markup);
};

export const removeLike = id => {
  const el = document.querySelector(`.likes__link[href="#${id}"]`);
  if (el) el.parentElement.remove(el);
};
