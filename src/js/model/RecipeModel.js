/* eslint-disable no-eval */
/* eslint-disable node/no-unsupported-features/es-syntax */
import axios from 'axios';

// 小數轉換為分數的庫
import { Fraction } from 'fractional';

// 小數轉換為分數
export const formatCount = count => {
  if (count) {
    // console.log(count);
    // count = 2.5 => 轉換為 string => 轉換為 [2, 5] (str) => 轉換為 [2, 5] (num)
    const [int, dec] = count
      .toString()
      .split('.')
      .map(el => parseInt(el, 10));
    // console.log(count.toString().length);

    // count = 1
    if (!dec) return count;

    if (int === 0) {
      // count = 0.5 => 1/2
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    }
    // count = 2.5 => 2 1/2
    const fr = new Fraction(count - int);
    return `${int} ${fr.numerator}/${fr.denominator}`;
  }

  return '?';
};

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.ingredients = res.data.recipe.ingredients;
      this.source_url = res.data.recipe.source_url;
    } catch (err) {
      console.log(err);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds'
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound'
    ];
    const units = [...unitsShort, 'kg', 'g'];

    // 原本是數組裡的字串
    // console.log(`我是ingredients => ${this.ingredients}`);

    const newIngredients = this.ingredients.map(el => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      //   console.log(`我是ingredient => ${ingredient}`);

      // 3) Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
      // console.log(arrIng);
      //   console.log(unitIndex);

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
        // Ex. 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);

        // console.log(`我是arrCount => ${arrCount}`);
        // console.log(arrCount.length);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        // There is NO unit and NO number in 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient
        };

        // console.log(ingredient);
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }

  updateServingsAndIng(type) {
    // servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
    // ingredient
    this.ingredients.forEach(ing => {
      ing.count *= newServings / this.servings;
    });
    this.servings = newServings;
  }
}
