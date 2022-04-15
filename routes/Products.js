const express = require("express");
const Product = require("../models/Products");
const router = express.Router();

function simpleStringify(object) {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == "object") {
      continue;
    }
    if (typeof object[prop] == "function") {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
} //https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json

router.get("/all", async (req, res) => {
  var filtered = await Product.find({});
  res.send(filtered);
});

router.get("/id/:id", async (req, res) => {
  var filtered = await Product.find({ id: req.params.id });
  res.send(filtered);
});

router.post("/multiIds", async (req, res) => {
  var product = await Product.find({'id': {$in: req.body.id}});
  res.send(product);
});

router.get("/keyword/:keyword", async (req, res) => {
  var mock_data = await Product.find({});

  var result = [];
  for (var i = 0; i < mock_data.length; i++) {
    if (mock_data[i].name.indexOf(req.params.keyword) > -1)
      result.push(mock_data[i]);
  }
  res.send(result);
});

router.get("/:apiName", async (req, res) => {
  var mock_data = await Product.find({});

  var result = [];
  for (var i = 0; i < mock_data.length; i++) {
    if (mock_data[i].name.indexOf(req.query.keyword) > -1)
      result.push(mock_data[i]);
  }
  res.send(result);
});

module.exports = router;
