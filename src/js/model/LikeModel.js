/* eslint-disable node/no-unsupported-features/es-syntax */
export default class Like {
  constructor() {
    this.likes = [];
  }

  addLike(id, author, title, img) {
    const like = { id, author, title, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
  }

  isLike(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getLikeNum() {
    return this.likes.length;
  }
}
