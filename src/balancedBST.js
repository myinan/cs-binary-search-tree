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
  insertNode(key) {
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

  // This method mainly calls deleteRec()
  deleteNode(key) {
    this.root = this.#deleteRec(this.root, key);
  }

  /* Given a binary search tree and a key, this function
   deletes the key and returns the new root */
  #deleteRec(root, k) {
    const curRoot = root;
    // Base case
    if (curRoot === null) {
      return curRoot;
    }

    // Recursive calls for ancestors of
    // node to be deleted
    if (curRoot.key > k) {
      curRoot.left = this.#deleteRec(curRoot.left, k);
      return curRoot;
    }
    if (curRoot.key < k) {
      curRoot.right = this.#deleteRec(curRoot.right, k);
      return curRoot;
    }

    // We reach here when curRoot is the node
    // to be deleted.

    // If one of the children is empty
    if (curRoot.left === null) {
      const temp = curRoot.right;
      return temp;
    }
    if (curRoot.right === null) {
      const temp = curRoot.left;
      return temp;
    }

    // If both children exist
    let succParent = curRoot;

    // Find successor
    let succ = curRoot.right;
    while (succ.left !== null) {
      succParent = succ;
      succ = succ.left;
    }

    // Since successor
    // is always left child of its parent
    // we can safely make successor's right
    // right child as left of its parent.
    // If there is no succ, then assign
    // succ.right to succParent.right
    if (succParent !== curRoot) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }

    // Copy Successor Data to curRoot
    curRoot.key = succ.key;

    // return curRoot
    return curRoot;
  }

  find(value, root = this.root) {
    const curRoot = root;
    let returnVal;

    if (curRoot?.key === value || !curRoot) {
      return curRoot;
    }

    if (value > curRoot.key) {
      returnVal = this.find(value, curRoot.right);
    } else if (value < curRoot.key) {
      returnVal = this.find(value, curRoot.left);
    }
    if (returnVal) return returnVal;
    return new Error("Could not find node with the searched value.");
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
newTree.deleteNode(22);
console.log("-----------------------------------------------------");

prettyPrint(newTree.root);
newTree.deleteNode(33);
console.log("-----------------------------------------------------");

prettyPrint(newTree.root);
newTree.deleteNode(3);
console.log("-----------------------------------------------------");

prettyPrint(newTree.root);
newTree.deleteNode(27);
console.log("-----------------------------------------------------");

prettyPrint(newTree.root);
newTree.insertNode(111);
console.log("-----------------------------------------------------");

prettyPrint(newTree.root);
newTree.insertNode(25);
console.log("-----------------------------------------------------");

prettyPrint(newTree.root);

console.log(newTree.find(9));
