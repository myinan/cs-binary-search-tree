import TreeNode from "./TreeNode";

export default class Tree {
  constructor(arr) {
    this.root = Tree.#buildTree(Tree.#sortUnique(arr));
  }

  // Function to build the binary search tree using recursion
  static #buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    const root = new TreeNode(arr[mid]);
    root.setLeft(Tree.#buildTree(arr, start, mid - 1));
    root.setRight(Tree.#buildTree(arr, mid + 1, end));

    return root;
  }

  // Function to sort the passed in array using insertion sort
  static #sortUnique(arr) {
    /* The constructor of Set takes an iterable object, like an Array,
  and the spread operator ... transform the set back into an Array. */
    let uniqueArr = [...new Set(arr)];

    let i, key, j;
    for (i = 1; i < uniqueArr.length; i++) {
      key = uniqueArr[i];
      j = i - 1;

      /* Move elements of uniqueArr[0..i-1], that are  
      greater than key, to one position ahead  
      of their current position */
      while (j >= 0 && uniqueArr[j] > key) {
        uniqueArr[j + 1] = uniqueArr[j];
        j = j - 1;
      }
      uniqueArr[j + 1] = key;
    }
    return uniqueArr;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 5, 22, 33, 56, 75, 2, 3, 3, 3, 2, 2, 2, 4, 27, 99];
const newTree = new Tree(arr);
prettyPrint(newTree.root);
