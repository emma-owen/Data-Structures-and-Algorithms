MAX_LEN = 128;

class ACNode {
  constructor(data) {
    this.data = data;
    this.children = new Array(MAX_LEN);
    this.isEndingChar = false;
    this.length = 0;
    this.fail = null;
  }
}

class ACTree {
  constructor(data) {
    this.root = new ACNode("/");
  }
  insert(text) {
    let node = this.root;
    for (let char of text) {
      let index = char.charCodeAt() + 1;
      if (!node.children[index]) {
        node.children[index] = new ACNode(char);
      }
      node = node.children[index];
    }
    node.isEndingChar = true;
    node.length = text.length;
  }
}
