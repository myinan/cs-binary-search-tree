export default class TreeNode {
  constructor(data) {
    this.key = data;
    this.left = null;
    this.right = null;
  }

  setLeft(value) {
    this.left = value;
  }

  setRight(value) {
    this.right = value;
  }
}
