/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
import Search from './model/SearchModel';
import Recipe from './model/RecipeModel';

import { el, renderLoader, removeLoader } from './view/base';

import * as searchView from './view/SearchView';
import * as recipeView from './view/RecipeVies';

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

el.searchResPage.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();

    searchView.renderResults(state.search.recipes, goToPage);
  }
});

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

    searchView.highLightSelected(id);
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
      recipeView.renderRecipe(state.recipe);
      // console.log(state.recipe);
    } catch (err) {
      console.log(err);
    }
  }
};

// window.addEventListener('hashchange', controlRecipe);

['hashchange'].forEach(even => window.addEventListener(even, controlRecipe));
