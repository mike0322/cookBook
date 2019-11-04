import Search from "./model/searchModel";

import {
  el,
  renderLoader,
  removeLoader
} from "./view/base";

import * as searchView from "./view/searchView";

el.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

el.searchResPage.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10)
    searchView.clearResults()

    searchView.renderResults(state.search.recipes, goToPage);
  };
})

// init state obj
const state = {};

const controlSearch = async () => {
  // 1. query = get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. get new query obj and add to state
    state.search = new Search(query);

    // 3. prepare ui for results (clear input value)
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(el.searchRes);

    // 4. search for recipes
    await state.search.getRecipes();

    // 5. render results on ui
    removeLoader();
    searchView.renderResults(state.search.recipes);
  };
};