const MerkleTree = require("../utils/merkleTree");
const { hashData } = require("../utils/hash");

// 🔥 Advanced Compare Function
const compareReplicas = (data1, data2) => {
  const tree1 = new MerkleTree(data1);
  const tree2 = new MerkleTree(data2);

  const root1 = tree1.getRoot();
  const root2 = tree2.getRoot();

  // Step 2: If equal → no issue
  if (root1 === root2) {
    return {
      isEqual: true,
      mismatches: [],
      missingInReplica1: [],
      missingInReplica2: []
    };
  }

  // Step 3: Create maps (IMPORTANT)
  const map1 = new Map();
  const map2 = new Map();

  data1.forEach(doc => {
  const id = (doc._id || doc.id)?.toString();
  if (id) map1.set(id, doc);
});

data2.forEach(doc => {
  const id = (doc._id || doc.id)?.toString();
  if (id) map2.set(id, doc);
});

  const mismatches = [];
  const missingInReplica1 = [];
  const missingInReplica2 = [];

  // Step 4: Compare data1 → data2
  for (let [id, doc1] of map1) {
    if (!map2.has(id)) {
      missingInReplica2.push(doc1);
    } else {
      const doc2 = map2.get(id);

      const h1 = hashData(doc1);
      const h2 = hashData(doc2);

      if (h1 !== h2) {
        mismatches.push({
          id,
          replica1: doc1,
          replica2: doc2
        });
      }
    }
  }

  // Step 5: Check missing in replica1
  for (let [id, doc2] of map2) {
    if (!map1.has(id)) {
      missingInReplica1.push(doc2);
    }
  }

  return {
    isEqual: false,
    root1,
    root2,
    mismatches,
    missingInReplica1,
    missingInReplica2
  };
};

module.exports = { compareReplicas };