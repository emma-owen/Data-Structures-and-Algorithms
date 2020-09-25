/**
 * 基于链表实现的循环队列
 */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class CircleQueue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  enqueue(value) {
    if (this.head === null) {
      //空队,相当于初始化队列
      console.log("---init:", value);
      this.head = new Node(value);
      this.head.next = this.head;
      this.tail = this.head;
    } else {
      const flag = this.head === this.tail; // 当flag为true时，队列只有一个元素
      console.log("---enqueue:", value);
      this.tail.next = new Node(value);
      this.tail.next.next = this.head;
      this.tail = this.tail.next;
      if (flag) {
        console.log("---enqueue2:", value);
        this.head.next = this.tail;
      }
    }
  }

  dequeue() {
    if (this.head === null) return -1;
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
const newCircularQueue = new CircleQueue();
console.log(newCircularQueue);
// 插入元素
newCircularQueue.enqueue(1);
newCircularQueue.enqueue(2);
newCircularQueue.enqueue(3);
newCircularQueue.enqueue(4);
// 获取元素
newCircularQueue.display();
// newCircularQueue.enqueue(1);
// console.log(newCircularQueue);
// newCircularQueue.display();
