/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
import Search from './model/SearchModel';
import Recipe from './model/RecipeModel';
import ShoppingList from './model/ShoppingModel';
import Likes from './model/LikeModel';

import { el, renderLoader, removeLoader } from './view/base';

import * as searchView from './view/SearchView';
import * as recipeView from './view/RecipeView';
import * as shoppingView from './view/ShoppingListView';
import * as likeView from './view/LikeView';

// init state obj
const state = {};

/*================
  Search Control
================*/
const controlSearch = async () => {
  // 1. query = get query from view
  const query = searchView.getInput();

  // Testing
  // const query = 'pizza';

  if (query) {
    // 2. get new query obj and add to state
    state.search = new Search(query);

    // 3. prepare ui for results (clear input value)
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(el.searchRes);

    try {
      // 4. search for recipes
      await state.search.getRecipes();

      // 5. render results on ui
      removeLoader();
      searchView.renderResults(state.search.recipes);
    } catch (err) {
      console.log(err);
      removeLoader();
    }
  }
};

// listen btn click
el.searchResPage.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();

    searchView.renderResults(state.search.recipes, goToPage);
  }
});

// submit 後執行 controlSearch
el.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

// Testing
// window.addEventListener('load', e => {
//   e.preventDefault();
//   controlSearch();
// });

/*================
  Recipe Control
================*/
const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  // console.log(id);

  if (id) {
    // prepare ui for change
    recipeView.clearRecipe();
    renderLoader(el.recipes);

    if (state.search) searchView.highLightSelected(id);
    // create new recipe obj
    state.recipe = new Recipe(id);

    // Testing
    // window.r = state.recipe;

    try {
      // get recipe data & parse ingredients
      await state.recipe.getRecipe();
      // console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      // calculate servings & time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      removeLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLike(id));
      // console.log(state.recipe.ingredients);
    } catch (err) {
      console.log(err);
    }
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

/*=====================
  Shopping List Control
======================*/
const controlShoppingList = () => {
  // create new Shopping List
  if (!state.shoppingList) state.shoppingList = new ShoppingList();

  // 將 recipe 的 ingredients 加入到 shopping list 裡面的 item
  state.recipe.ingredients.forEach(item => {
    const el = state.shoppingList.addItem(
      item.count,
      item.unit,
      item.ingredient
    );
    // render shopping list
    shoppingView.renderShopping(el);
  });
  console.log(state.shoppingList);
};

// shopping list btn listener
el.shoppingList.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // handle delete btn
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from ui
    shoppingView.deleteShopping(id);

    // delete from state
    state.shoppingList.deleteItem(id);
    console.log(state.shoppingList);
<<<<<<< HEAD

=======
>>>>>>> master
    // handle count input
  } else if (e.target.matches('.shopping__count-value')) {
    if (e.target.value >= 0.1) {
      const val = parseFloat(e.target.value, 10);
      state.shoppingList.updateCount(id, val);
<<<<<<< HEAD
      // console.log(state.shoppingList);
    }
  }
});

/*=====================
  Like Control
======================*/
// test
state.likes = new Likes();
likeView.toggleLikeList(state.likes.getLikeNum());

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;
  // 當前食譜還沒加入 like
  if (!state.likes.isLike(currentId)) {
    // add to state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.author,
      state.recipe.title,
      state.recipe.img
    );
    // toggle the like btn
    likeView.toggleLikeBtn(true);
    // render to ui
    likeView.renderLike(newLike);
  } else {
    // remove like from state
    state.likes.deleteLike(currentId);
    // toggle the like btn
    likeView.toggleLikeBtn(false);
    // remove like from ui
    likeView.removeLike(currentId);
  }

  likeView.toggleLikeList(state.likes.getLikeNum());
};

// hash change 後執行 controlRecipe
// window.addEventListener('hashchange', controlRecipe);

// recipe btn listener
el.recipes.addEventListener('click', e => {
  // handel servings & ingredients btn (inc)
  if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServingsAndIng('inc');
    recipeView.renderUpdateIngCount(state.recipe);

    // handel servings & ingredients btn (dec)
  } else if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServingsAndIng('dec');
      recipeView.renderUpdateIngCount(state.recipe);
=======
      console.log(state);
      console.log(state.shoppingList);
>>>>>>> master
    }

    // handle shopping list btn
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlShoppingList();

    // handle like btn
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});
