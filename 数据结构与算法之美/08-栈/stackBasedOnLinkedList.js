/**
 * 基于链表实现栈
 */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class StackBasedLinkedList {
  constructor() {
    this.top = null;
  }
  push(value) {
    const node = new Node(value);
    if (this.top === null) {
      // 空栈
      this.top = node;
    } else {
      node.next = this.top;
      this.top = node;
    }
  }
  pop() {
    if (this.top === null) {
      console.log("空栈不能弹出");
      return -1;
    } else {
      const res = this.top.element;
      this.top = this.top.next;
      return res;
    }
  }
  // 为了实现浏览器的前进后退
  clear() {
    this.top = null;
  }
  display() {
    if (this.top === null) {
      return;
    }
    let temp = this.top;
    while (temp !== null) {
      console.log(temp.element);
      temp = temp.next;
    }
  }
}

// 测试
const newStack = new StackBasedLinkedList();
newStack.push(1);
newStack.push(2);
newStack.push(3);
//获取元素
// let res = 0;
// console.log("-------获取pop元素------");
// while (res !== -1) {
//   res = newStack.pop();
//   console.log(res);
// }
exports.CreatedStack = StackBasedLinkedList;
