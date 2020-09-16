class TrieNode {
  constructor(data) {
    this.data = data;
    this.children = new Array(26);
    this.isEndingChar = false;
  }
}

const ACode = "a".charCodeAt();

class TrieTree {
  constructor(data) {
    this.root = new TrieNode("/");
  }
  insert(text) {
    let node = this.root;
    for (const char of text) {
      let index = char.charCodeAt() - ACode;
      if (!node.children[index]) {
        node.children[index] = new TrieNode(char);
      }
      node = node.children[index];
    }
    node.isEndingChar = true;
  }

  find(text) {
    let node = this.root;
    for (let char of text) {
      let index = char.charCodeAt() - ACode;
      if (node.children[index]) {
        node = node.children[index];
      } else {
        return false;
      }
    }
    return node.isEndingChar;
  }
}

const tree = new TrieTree();

const strs = ["how", "hi", "her", "hello", "so", "see"];
for (const str of strs) {
  tree.insert(str);
}

for (const str of strs) {
  console.log(trr.find(str));
}
console.log(trr.find("world"));
