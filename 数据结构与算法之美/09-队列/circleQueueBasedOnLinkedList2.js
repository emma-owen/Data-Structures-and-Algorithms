/**
 * 基于链表实现的循环队列。
 *
 * Author: nameczz
 */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class CircularQueue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(value) {
    if (this.head === null) {
      console.log("type1", value);
      this.head = new Node(value);
      this.head.next = this.head;
      this.tail = this.head;
    } else {
      const flag = this.head === this.tail;
      this.tail.next = new Node(value);
      this.tail.next.next = this.head;
      this.tail = this.tail.next;
      console.log("type2", value);
      if (flag) {
        console.log("type3", value);
        this.head.next = this.tail;
      }
    }
  }

  dequeue() {
    if (this.head == null) return -1;

    if (this.head === this.tail) {
      const value = this.head.element;
      this.head = null;
      return value;
    } else {
      const value = this.head.element;
      this.head = this.head.next;
      this.tail.next = this.head;
      return value;
    }
  }

  display() {
    let res = 0;
    console.log("-------获取dequeue元素------");
    while (res !== -1) {
      res = this.dequeue();
      console.log(res);
    }
  }
}
// Test
const newCircularQueue = new CircularQueue();
console.log(newCircularQueue);
// 插入元素
newCircularQueue.enqueue(1);
// console.log(newCircularQueue);
newCircularQueue.enqueue(2);
// console.log(newCircularQueue);
newCircularQueue.enqueue(3);
// console.log(newCircularQueue);
newCircularQueue.enqueue(4);
// console.log(newCircularQueue);
newCircularQueue.enqueue(5);
// console.log(newCircularQueue);
// 获取元素
newCircularQueue.display();
console.log(newCircularQueue);
newCircularQueue.enqueue(1);
console.log(newCircularQueue);
newCircularQueue.display();
