/**
 * 1、单链表反转
 * 2、链表中环的检测
 * 3、两个有序的链表合并
 * 4、删除链表倒数第n个结点
 * 5、求链表的中间结点
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
    let currentNode = this.head;
    while (currentNode !== null && currentNode.element !== item) {
      currentNode = currentNode.next;
    }
    console.log("findByValue", currentNode);
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
    console.log("findByIndex", currentNode);
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
      console.log("insert", "未找到插入位置");
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
    console.log("findPre", currentNode);
    return currentNode;
  }
  // 根据值删除
  remove(item) {
    const preNode = this.findPre(item);
    if (preNode === -1) {
      console.log("remove", "未找到该值");
      return;
    }
    preNode.next = preNode.next.next;
  }
  // 遍历显示所有结点
  display() {
    // 先检查是否为环
    if (this.checkCircle()) return false;
    let currentNode = this.head;
    while (currentNode !== null) {
      console.log("display", currentNode.element);
      currentNode = currentNode.next;
    }
  }
  // 尾插法 反转单链表
  reverseList() {
    const root = new Node("head");
    let currentNode = this.head.next;
    while (currentNode !== null) {
      const next = currentNode.next;
      currentNode.next = root.next;
      root.next = currentNode;
      currentNode = next;
    }
    this.head = root;
  }
  // 环验证
  checkCircle() {
    let fast = this.head.next;
    let slow = this.head;
    while (fast !== null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
      if (slow === fast) {
        return true;
      }
    }
    return false;
  }
  // 删除倒数第k个结点
  removeByIndexFromEnd(index) {
    if (this.checkCircle()) return false;
    let pos = 1;
    this.reverseList();
    let currentNode = this.head.next;
    while (currentNode !== null && pos < index) {
      currentNode = currentNode.next;
      pos++;
    }
    if (currentNode === null) {
      console.log("removeByIndexFromEnd", "该结点不存在");
      return false;
    }
    this.remove(currentNode.element);
    this.reverseList();
  }

  // 求中间结点
  findMiddleNode() {
    let fast = this.head;
    let slow = this.head;
    while (fast.next !== null && fast.next.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
    }
    console.log("findMiddleNode", slow);
    return slow;
  }
}

const mergeSortedLists = (listA, listB) => {
  if (!listA) return listB;
  if (!listB) return listA;
  let a = listA;
  let b = listB;
  let resultList = undefined;
  if (a.element < b.element) {
    resultList = a;
    a = a.next;
  } else {
    resultList = b;
    b = b.next;
  }
  let currentNode = resultList;
  console.log(currentNode);
  console.log(a);
  console.log(b);
  while (a !== null && b !== null) {
    if (a.element < b.element) {
      currentNode.next = a;
      a = a.next;
    } else {
      currentNode.next = b;
      b = b.next;
    }
    currentNode = currentNode.next;
  }
  if (a != null) {
    currentNode.next = a;
  } else {
    currentNode.next = b;
  }
  return resultList;
};

// 测试
const LList = new LinkedList();
LList.insert("chen", "head");
LList.insert("curry", "chen");
LList.insert("sang", "head");
LList.insert("zhao", "head");
console.log("-------------initial list------------");
LList.display();
console.log("-------------start reverse------------");
LList.reverseList();
LList.display();
console.log("--------------checkCircle---------");
console.log(LList.checkCircle());
console.log("-----------initial list-------------");
LList.display();
console.log("-------------remove the one before last ------------");
LList.removeByIndexFromEnd(2);
LList.display();

const sortedList1 = new LinkedList();
sortedList1.insert(9, "head");
sortedList1.insert(8, "head");
sortedList1.insert(7, "head");
sortedList1.insert(6, "head");
const sortedList2 = new LinkedList();
sortedList2.insert(21, "head");
sortedList2.insert(20, "head");
sortedList2.insert(19, "head");
sortedList2.insert(18, "head");
sortedList2.insert(4, "head");
console.log("-------------sort two list ------------");
let sortedList = mergeSortedLists(sortedList1.head.next, sortedList2.head.next);
while (sortedList !== null) {
  console.log(sortedList.element);
  sortedList = sortedList.next;
}
