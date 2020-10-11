/*
 *  带碰撞处理的Hash表
 *  实际上在js中,单独实现一个Hash表感觉不是很有实用价值
 *  如果需要通常是直接将Object,Map,Set来当Hash表用
 *
 * 总结：
 *  我写的这个实现把store 从Object换成Array不会有运行性能上的区别
 *  把hash函数改成生成一定范围的值的类型,然后初始化一个指定长度的数组因该会有一定的性能提升
 *  把store换成Map，然后修改相关实现会获得飞越性的提升，因为在js中Map的实现对这种类型的操作做了优化
 */

class HashTable {
  constructor() {
    // 创建一个没有原型链的对象
    this.store = Object.create(null);
  }

  /**
   * Donald E. Knuth在“计算机编程艺术第3卷”中提出的算法，主题是排序和搜索第6.4章。
   *
   * @param {*} string
   * 翻译自别的语言的实现
   * 需要注意的是由于js中没有int类型，number是dobule的标准实现
   * 所以返回前的位运算实际和本来的设想不一致，也就是同样的实现，在别的语言中返回可能不同
   * @memberof HashTable
   */
  hash(string) {
    const len = string.length;
    const hash = len;
    for (let i = 0; i < len; i++) {
      hash = (hash << 5) ^ (hash >> 27) ^ string.charCodeAt(i);
    }
    return hash & 0x7fffffff;
  }

  isCrash(item) {
    return Object.prototype.toString.call(item) === "[object Map]";
  }

  put(item) {
    if (typeof item.key !== "string") {
      throw "item must have key";
    }
    const hash = this.hash(item.key);
    // 碰撞处理
    const crash = this.store[hash];
    if (crash) {
      if (crash.key === item.key) {
        this.store[hash] = item;
        return;
      }
      if (!this.isCrash(crash)) {
        this.store[hash] = new Map();
      }
      this.store[hash].set(item.key, item);
    } else {
      this.store[hash] = item;
    }
  }

  get(key) {
    const hash = this.hash(key);
    let value = this.store[hash] || null;
    if (this.isCrash(value)) {
      return value.get(key);
    } else {
      return value;
    }
  }

  remove(key) {
    const hash = this.hash(key);
    const value = this.store[hash] || null;
    if (!value) {
      return null;
    }
    if (this.isCrash(value)) {
      value.delete(key);
    } else {
      delete this.store[hash];
    }
  }

  clear() {
    this.store = {};
  }

  print() {
    const values = Object.values(this.store);
    values.forEach((element) => {
      if (this.isCrash(element)) {
        element.forEach((item) => {
          console.log(item);
        });
      } else {
        console.log(element);
      }
    });
  }
}
