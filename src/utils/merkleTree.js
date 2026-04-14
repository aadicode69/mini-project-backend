const { hashData } = require("./hash");
class MerkleTree {
  constructor(data) {
    this.leaves = data.map(d => hashData(d));
    this.tree = [this.leaves];
    this.buildTree();
  }
  buildTree() {
    let level = this.leaves;
    while (level.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < level.length; i += 2) {
        if (i + 1 < level.length) {
          nextLevel.push(hashData(level[i] + level[i + 1]));
        } else {
          nextLevel.push(level[i]);
        }
      }
      this.tree.push(nextLevel);
      level = nextLevel;
    }
  }
  getRoot() {
    return this.tree[this.tree.length - 1][0];
  }
}
module.exports = MerkleTree;