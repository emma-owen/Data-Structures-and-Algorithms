const MAX_LEVEL = 16;

class Node {
  constructor({ data = -1, maxLevel = 0, refer = new Array(MAX_LEVEL) } = {}) {
    this.data = data;
    this.maxLevel = maxLevel;
    this.refer = refer;
  }
}

class SkipList {
  constructor() {
    this.head = new Node();
    this.levelCount = 1;
  }

  randomLevel() {
    let level = 1;
    for (let i = 1; i < MAX_LEVEL; i++) {
      if (Math.random() < 0.5) {
        level++;
      }
    }
    return level;
  }

  /**
   * 向跳表里面插入数据
   *
   * @param {*} value
   * @memberof SkipList
   */
  insert(value) {
    const level = this.randomLevel;
    const newNode = new Node({ data: value, maxLevel: level });
    const update = new Array(level).fill(new Node());
    let p = this.head;
    for (let i = level - 1; i >= 0; i--) {
      while (p.refer[i] !== undefined && p.refer[i].data < value) {
        p = p.refer[i];
      }
      update[i] = p;
    }
    for (let i = 0; i < level; i++) {
      newNode.refer[i] = update[i].refer[i];
      update[i].refer[i] = newNode;
    }
    if (this.levelCount < level) {
      this.levelCount = level;
    }
  }

  /**
   * 查找跳表里的某个数据结点，并返回
   *
   * @param {*} value
   * @returns
   * @memberof SkipList
   */
  find(value) {
    if (value === undefined) return null;
    let p = this.head;
    for (let i = this.levelCount - 1; i >= 0; i--) {
      while (p.refer[i] !== undefined && p.refer[i].data < value) {
        p = p.refer[i];
      }
    }

    if (p.refer[0] !== undefined && p.refer[0].data === value) {
      return p.refer[0];
    }
    return null;
  }

  /**
   * 移除跳表中的某个数据结点
   *
   * @param {*} value
   * @returns
   * @memberof SkipList
   */
  remove(value) {
    let _node;
    let p = this.head;
    const update = new Array(new Node());
    for (let i = this.levelCount - 1; i >= 0; i--) {
      while (p.refer[i] !== undefined && p.refer[i].data < value) {
        p = p.refer[i];
      }
    }
    if (p.refer[0] !== undefined && p.refer[0].data === value) {
      _node = p.refer[0];
      for (let i = 0; i <= this.levelCount - 1; i++) {
        if (
          update[i].refer[i] !== undefined &&
          update[i].refer[i].data === value
        ) {
          update[i].refer[i] = update[i].refer[i].refer[i];
        }
      }
      return _node;
    }
    return null;
  }

  printAll() {
    let p = this.head;
    while (p.refer[0] !== undefined) {
      console.log(p.refer[0].data);
      p = p.refer[0];
    }
  }
}
