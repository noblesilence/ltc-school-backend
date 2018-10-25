const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const router = express.Router();

// retrieve latest lessons
router.get("/", async (req, res) => {
  const collection = await loadLessonsCollection();
  res.send(await collection.find({}).toArray());
});

// insert a new lesson
router.post("/", async (req, res) => {
  const collection = await loadLessonsCollection();
  await collection.insertOne({
    seqNo: req.body.seqNo,
    name: req.body.name,
    description: req.body.description,
    videoId: req.body.videoId,
    createdAt: new Date()
  });
  res.status(200).send();
});

async function loadLessonsCollection() {
  const client = await MongoClient.connect(
    "mongodb://aye2m:aye13m@ds133113.mlab.com:33113/ltc_school",
    { useNewUrlParser: true }
  );
  return client.db("ltc_school").collection("lessons");
}

module.exports = router;
