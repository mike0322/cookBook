import {
    el
} from "./base";

// get search input value
export const getInput = () => el.searchInput.value;

// clear results
export const clearResults = () => {
    el.recipesList.innerHTML = '';
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
                newTitle.push(cur)
            }
            return acc + cur.length
        }, 0);

        return `${newTitle.join(' ')}...`
    };

    return `${title}...`
};


// 遍歷 state.search.recipes 後，每個 item 當成參數丟給 renderRecipe 執行
export const renderResults = results => {
    results.forEach(renderRecipe);
};

export const renderRecipe = recipe => {
    const markUp = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
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