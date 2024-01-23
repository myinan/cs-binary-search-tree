# Balanced BST (Deployed to `gh-pages`)
## `.src/balancedBST.js`

### A balanced binary search tree implementation with Vanilla Javascript.
+ Create a new Binary Search Tree instance with the `new Tree(arr)` call. arr is an array provided by the user which might have duplicate items and don't have to be sorted. Cleaning and sorting the data is handled by the Tree class.

+ `insertNode(key)` instance method insert a new node into the BST, which has the "key" provided by user as it's key property.

+ `deleteNode(key)` instance method removes the node with the given key from the BST.

+ `find(value)` method accepts a value and returns the node with the given value, if it exists. Otherwise returns an an appropriate error.

+ `levelOrder, inOrder, preOrder, and postOrder` methods accept an optional callback function as its parameter.<br>
`levelOrder` traverses the tree in breadth-first level order and provides a level ordered array of nodes.<br>
Each of `inOrder, preOrder, and postOrder` functions traverse the tree in their respective depth-first order and provide an ordered array of nodes.<br>
The functions returns an array of values if no callback is given as an argument.

+ `getNodeHeight(key)` method accepts a node and returns its height. Height is defined as the number of edges in the longest path from a given node to a leaf node.

+ `getNodeDepth(key)` method accepts a node and returns its depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.

+ `isBalanced()` method checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.

+ `rebalance()` method rebalances an unbalanced tree.

+ Also, the `prettyPrint(node)` utility function can be used to log the BST to the console in a more pleasant way. The node parameter should be the root of the Tree class instance.