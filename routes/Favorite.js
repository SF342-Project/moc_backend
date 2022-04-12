const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Shop = require('../models/Shops')

router.post("/product", async (req, res) => {
  const user = await User.findOne({ _id: req.body._id } , {date: 0, __v: 0});
  if (user) {
    await user.product_lists.push(req.body.product_id);
    user.save();
    res.send(user);
  } else {
    res.status(400).send({
      success: false,
      message: "User Id is invalid!!",
    });
  }
});

router.get("/product", async (req, res) => {
    const user = await User.findOne({ _id: req.body._id });
    if (user) {
      let lists = await user.product_lists;
      res.send(lists);
    } else {
      res.status(400).send({
        success: false,
        message: "User Id is invalid!!",
      });
    }
  });

router.delete("/product", async (req, res) => {
  const user = await User.findOne({ _id: req.body._id });
  if (user) {
    let lists = await user.product_lists;
    var check = lists.indexOf(req.body.product_id);
    console.log(check);
    if (check != -1) {
      lists.splice(lists.indexOf(req.body.product_id), 1);
      user.save();
      res.send(user);
    } else {
      res.status(400).send({
        success: false,
        message: "Product ID is invalid!!",
      });
    }
  } else {
    res.status(400).send({
      success: false,
      message: "User ID is invalid!!",
    });
  }
});

router.post("/shop", async (req, res) => {
    const user = await User.findOne({ _id: req.body._id });
    if (user) {
      await user.shop_lists.push(req.body.shop_id);
      user.save();
      res.send(user);
    } else {
      res.status(400).send({
        success: false,
        message: "Shop Id is invalid!!",
      });
    }
  });

  // router.get("/shop", async (req, res) => {
  //   const user = await User.findOne({ _id: req.body._id });
  //   if (user) {
  //     let lists = await user.shop_lists;
  //     res.send(lists);
  //   } else {
  //     res.status(400).send({
  //       success: false,
  //       message: "User Id is invalid!!",
  //     });
  //   }
  // });

  router.post("/getShop", async (req, res) => {
    const shops = await Shop.find({ 'ord': {$in: req.body.ord} });
    res.send(shops)
  
  });
  
  router.put("/shop", async (req, res) => {
    const user = await User.findOne({ _id: req.body._id });
    if (user) {
      let lists = await user.shop_lists;
      var check = lists.indexOf(req.body.shop_id);
      if (check != -1) {
        lists.splice(lists.indexOf(req.body.shop_id), 1);      
        user.save();
        res.send(user);
      } else {
        res.status(400).send({
          success: false,
          message: "Shop ID is invalid!!",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "User ID is invalid!!",
      });
    }
  });

module.exports = router;
