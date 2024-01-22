import Node from "./TreeNode";

export default class Tree {
  constructor(arr) {
    this.root = Tree.#buildTree(Tree.#sortUnique(arr));
  }

  // Function to build the binary search tree using recursion
  static #buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);
    root.setLeft(Tree.#buildTree(arr, start, mid - 1));
    root.setRight(Tree.#buildTree(arr, mid + 1, end));

    return root;
  }

  // Function to sort the passed in array using insertion sort
  static #sortUnique(arr) {
    /* The constructor of Set takes an iterable object, like an Array,
  and the spread operator ... transform the set back into an Array. */
    const uniqueArr = [...new Set(arr)];

    let i;
    let key;
    let j;
    for (i = 1; i < uniqueArr.length; i += 1) {
      key = uniqueArr[i];
      j = i - 1;

      /* Move elements of uniqueArr[0..i-1], that are  
      greater than key, to one position ahead  
      of their current position */
      while (j >= 0 && uniqueArr[j] > key) {
        uniqueArr[j + 1] = uniqueArr[j];
        j -= 1;
      }
      uniqueArr[j + 1] = key;
    }
    return uniqueArr;
  }

  // This method mainly calls insertRec()
  insert(key) {
    this.root = this.#insertRec(this.root, key);
  }

  // A recursive function to insert a new key in BST
  #insertRec(root, key) {
    let curRoot = root;
    // If the tree is empty, return a new node
    if (curRoot === null) {
      curRoot = new Node(key);
      return curRoot;
    }

    // Otherwise, recur down the tree
    if (key < curRoot.key) curRoot.left = this.#insertRec(curRoot.left, key);
    else if (key > curRoot.key)
      curRoot.right = this.#insertRec(curRoot.right, key);

    // Return the (unchanged) node pointer
    return curRoot;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.key}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 5, 22, 33, 56, 75, 2, 3, 3, 3, 2, 2, 2, 4, 27, 99];
const newTree = new Tree(arr);

prettyPrint(newTree.root);
