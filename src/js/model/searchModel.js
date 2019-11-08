/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getRecipes() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );
      this.recipes = res.data.recipes;
    } catch (err) {
      console.log(err);
    }
  }
}
