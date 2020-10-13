class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/****
 * 搜索二叉树
 * 允许重复值添加
 */

class SearchTree {
  constructor() {
    this.root = null;
  }

  insert(num) {
    const node = new Node(num);
    if (this.root === null) {
      this.root = node;
      return;
    }
    const parent = this.getPrev(num);
    if (num < parent.value) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  }

  remove(num) {
    const point = this.root;
    const parent = null;
    const tree = this;
    const res = null;
    while (true) {
      if (point.left) {
        if (num < point.left.value || num < point.value) {
          parent = point;
          point = point.left;
          continue;
        }
      }
      if (point.right) {
        if (num >= point.right.value || num >= point.value) {
          delMethod(point, parent);
          if (parent === null) {
            point = this.root;
          } else {
            parent = parent;
            point = parent.right;
          }
          res = true;
          continue;
        }
      }
      if (point.value === num) {
        res = true;
        delMethod(point, parent);
      }
      break;
    }
    return res;

    function delMethod(delNode, parent) {
      let p = delNode;
      let pp = parent;

      // 要删除的节点有两个子节点
      if (p.left != null && p.right != null) {
        // 查找右子树中最小节点
        let minP = p.right;
        let minPP = p;
        while (minP.left != null) {
          minPP = minP;
          minP = minP.left;
        }
        p.value = minP.value;
        p = minP;
        pp = minPP;
      }
      // 删除结点是叶子结点或者仅有一个子节点
      let child;
      if (p.left != null) {
        child = p.left;
      } else if (p.right != null) {
        child = p.right;
      } else {
        child = null;
      }
      if (pp == null) {
        tree.root = child;
      } else if (pp.left == p) {
        pp.left = child;
      } else {
        pp.right = child;
      }
    }
  }
}
