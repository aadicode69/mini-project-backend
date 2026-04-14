const mongoose = require("mongoose");
const Replica = require("../models/Replica");
const { compareReplicas } = require("./merkleService");

const connectReplica = async (uri, dbName) => {
  return mongoose.createConnection(uri + "/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const getCollectionData = async (conn, collectionName) => {
  return conn.collection(collectionName).find({}).toArray();
};

exports.runRepair = async () => {
  try {
    const replicas = await Replica.find();

    if (replicas.length < 2) {
      return { msg: "Need at least 2 replicas" };
    }

    // connect all replicas
    const connections = [];
    for (let r of replicas) {
      const conn = await connectReplica(r.uri, r.dbName);
      connections.push({ conn, replica: r });
    }

    // assume same collection name
    const collection = "testdata";

    const dataList = [];

    for (let c of connections) {
      const data = await getCollectionData(c.conn, collection);
      dataList.push(data);
    }

    // compare first two (basic version)
    const result = compareReplicas(dataList[0], dataList[1]);

    if (result.isEqual) {
      return { msg: "All replicas in sync" };
    }

    // 🔥 SIMPLE REPAIR STRATEGY
    // copy data from replica 1 → replica 2

    const source = dataList[0];
    const targetConn = connections[1].conn;

    await targetConn.collection(collection).deleteMany({});
    await targetConn.collection(collection).insertMany(source);

    return {
      msg: "Repair completed",
      details: result
    };

  } catch (e) {
    return { msg: "Error", error: e.message };
  }
};