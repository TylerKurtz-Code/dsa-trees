/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function findMinDepth(node) {
      if (!node.left && !node.right) return 1;
      if (!node.left) return findMinDepth(node.right) + 1;
      if (!node.right) return findMinDepth(node.left) + 1;
      return Math.min(findMinDepth(node.left), findMinDepth(node.right)) + 1;
    }

    return findMinDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function findMaxDepth(node) {
      if (!node.left && !node.right) return 1;
      if (!node.left) return findMaxDepth(node.right) + 1;
      if (!node.right) return findMaxDepth(node.left) + 1;
      return Math.max(findMaxDepth(node.left), findMaxDepth(node.right)) + 1;
    }

    return findMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;

    let maxSum = -Infinity;

    function maxPathSum(node) {
      if (!node) return 0;

      const leftMax = Math.max(maxPathSum(node.left), 0);
      const rightMax = Math.max(maxPathSum(node.right), 0);

      const currentMax = node.val + leftMax + rightMax;
      maxSum = Math.max(maxSum, currentMax);

      return node.val + Math.max(leftMax, rightMax);
    }

    maxPathSum(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let result = null;

    function traverse(node) {
      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;
        }
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === node2) return false;

    function findNodeAndParent(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { depth, parent };

      const leftResult = findNodeAndParent(node.left, target, depth + 1, node);
      if (leftResult) return leftResult;

      const rightResult = findNodeAndParent(node.right, target, depth + 1, node);
      return rightResult;
    }

    const node1Info = findNodeAndParent(this.root, node1);
    const node2Info = findNodeAndParent(this.root, node2);

    if (!node1Info || !node2Info) return false;

    return node1Info.depth === node2Info.depth && node1Info.parent !== node2Info.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    if (!tree || !tree.root) return "[]";

    const result = [];
    const queue = [tree.root];

    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push(null);
      }
    }

    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
      result.pop();
    }

    return JSON.stringify(result);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const values = JSON.parse(stringTree);

    if (!values || values.length === 0) {
      return new BinaryTree();
    }

    const root = new BinaryTreeNode(values[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < values.length) {
      const node = queue.shift();

      if (i < values.length && values[i] !== null) {
        node.left = new BinaryTreeNode(values[i]);
        queue.push(node.left);
      }
      i++;

      if (i < values.length && values[i] !== null) {
        node.right = new BinaryTreeNode(values[i]);
        queue.push(node.right);
      }
      i++;
    }

    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function findLCA(node, p, q) {
      if (!node) return null;
      if (node === p || node === q) return node;

      const left = findLCA(node.left, p, q);
      const right = findLCA(node.right, p, q);

      if (left && right) return node;
      return left || right;
    }

    return findLCA(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
