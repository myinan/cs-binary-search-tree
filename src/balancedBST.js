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

  // Breadth-first traversal
  levelOrder(callback = (input) => input) {
    if (this.root === null) {
      return [];
    }

    const result = [];
    const queue = [];

    queue.push(this.root);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(currentNode.key);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    return callback(result);
  }

  // Depth-First - Left / Root / Right Traversal
  // Depth-First LRR Traversal creates a sorted array from a BST
  inOrder(callback = (param) => param) {
    const result = [];
    this.#inOrderTraverse(this.root, result);
    return callback(result);
  }

  #inOrderTraverse(node, result) {
    if (node !== null) {
      this.#inOrderTraverse(node.left, result);
      result.push(node.key);
      this.#inOrderTraverse(node.right, result);
    }
  }

  // Depth-First - Root / Left / Right Traversal
  preOrder(callback = (param) => param) {
    const result = [];
    this.#preOrderTraverse(this.root, result);
    return callback(result);
  }

  #preOrderTraverse(node, result) {
    if (node !== null) {
      result.push(node.key);
      this.#preOrderTraverse(node.left, result);
      this.#preOrderTraverse(node.right, result);
    }
  }

  // Depth-First - Left / Right / Root Traversal
  postOrder(callback = (param) => param) {
    const result = [];
    this.#postOrderTraverse(this.root, result);
    return callback(result);
  }

  #postOrderTraverse(node, result) {
    if (node !== null) {
      this.#postOrderTraverse(node.left, result);
      this.#postOrderTraverse(node.right, result);
      result.push(node.key);
    }
  }

  getNodeHeight(key) {
    const node = this.find(key);
    if (Object.getPrototypeOf(node).name === "Error") return node;
    return this.#getNodeHeightHelper(node);
  }

  #getNodeHeightHelper(node) {
    if (node === null) {
      return -1; // Height of an empty tree is -1
    }

    const leftHeight = this.#getNodeHeightHelper(node.left);
    const rightHeight = this.#getNodeHeightHelper(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  getNodeDepth(key) {
    const node = this.find(key);
    if (Object.getPrototypeOf(node).name === "Error") return node;
    return this.#getNodeDepthHelper(node);
  }

  #getNodeDepthHelper(node) {
    const { root } = this;
    if (node === null) {
      return -1; // Depth of an empty tree is -1
    }

    if (node === root) {
      return 0; // Depth of the root node is 0
    }

    const parentDepth = this.#getNodeDepthHelper(
      Tree.#findParent(root, node),
      root,
    );
    return parentDepth + 1;
  }

  static #findParent(root, target) {
    if (root === null || root === target) {
      return null; // No parent or found the target as the root
    }

    if (root.left === target || root.right === target) {
      return root;
    }

    const leftParent = Tree.#findParent(root.left, target);
    const rightParent = Tree.#findParent(root.right, target);

    return leftParent || rightParent;
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

console.log(newTree.postOrder());
console.log(newTree.getNodeHeight(56));
console.log(newTree.getNodeDepth(56));
