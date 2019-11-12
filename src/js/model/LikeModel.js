/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
export default class Like {
  constructor() {
    this.likes = [];
  }

  addLike(id, author, title, img) {
    const like = { id, author, title, img };
    this.likes.push(like);

    this.persistData();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
    this.persistData();
  }

  isLike(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getLikeNum() {
    return this.likes.length;
  }

  // 將數據保存到 local storage
  persistData() {
    localStorage.setItem('like', JSON.stringify(this.likes));
  }

  // 將數據從 local storage 取出
  getStorageData() {
    const storage = JSON.parse(localStorage.getItem('like'));
    if (storage) this.likes = storage;
  }
}
