/**
 * 1、单链表的插入、删除、查找操作
 * 2、链表中存储的是int类型的数据
 */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node("head");
  }
  //根据value查找结点
  findByValue(item) {
    let currentNode = this.head.next;
    while (currentNode !== null && currentNode.element !== item) {
      currentNode = currentNode.next;
    }
    console.log(currentNode);
    return currentNode === null ? -1 : currentNode;
  }
  // 根据index查找节点，下标从0开始
  findByIndex(index) {
    let currentNode = this.head.next;
    let pos = 0;
    while (currentNode !== null && pos !== index) {
      currentNode = currentNode.next;
      pos++;
    }
    console.log(currentNode);
    return currentNode === null ? -1 : currentNode;
  }
  // 向链表尾追加结点
  append(newElement) {
    const newNode = new Node(newElement);
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
  }
  // 指定元素向后插入
  insert(newElement, element) {
    const newNode = new Node(newElement);
    const currentNode = this.findByValue(element);
    if (currentNode === -1) {
      console.log("未找到插入位置");
      return;
    }
    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }
  // 查找前一个
  findPre(item) {
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    if (currentNode.next === null) {
      return -1;
    }
    console.log(currentNode);
    return currentNode;
  }
  // 根据值删除
  remove(item) {
    const preNode = this.findPre(item);
    if (preNode === -1) {
      console.log("未找到该值");
      return;
    }
    preNode.next = preNode.next.next;
  }
  // 遍历显示所有结点
  display() {
    let currentNode = this.head.next;
    while (currentNode !== null) {
      console.log(currentNode.element);
      currentNode = currentNode.next;
    }
  }
}

// 测试
const testLink = new LinkedList();
testLink.append("chen");
testLink.append("curry");
testLink.append("sang");
testLink.append("zhao");
testLink.display();
console.log("-------------insert item------------");
testLink.insert("qian", "chen");
testLink.insert("zhou", "zhao");
testLink.display();
console.log("-------------remove item------------");
testLink.remove("curry");
testLink.display();
console.log("-------------find by item------------");
testLink.findByValue("chen");
console.log("-------------find by index------------");
testLink.findByIndex(2);
console.log("-------------与头结点同值元素测试------------");
testLink.insert("head", "sang");
testLink.display();
testLink.findPre("head");
testLink.remove("head");
testLink.display();
console.log("-----------");
testLink.reverseList();
console.log("---------------");
testLink.display();
