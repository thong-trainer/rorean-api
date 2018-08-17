const mongoose = require('mongoose');
// import models
const User = require('../models/user');
// global constant variable
const query = {
  TELEPHONE: "telephone",
  EMAIL: "email",
  ID: "id"
};

module.exports = {
  // get all users active
  index: async (req, res, next) => {
    // params validation
    if (isNaN(req.params.index) || isNaN(req.params.limit)) {
      res.status(500).json({
        message: process.env.INCORRECT_INFO, success: false
      });
      return;
    }

    const limit = parseInt(req.params.limit, 0);
    const skip = req.params.index * limit;
    const users = await User.find({active: true}).skip(skip).limit(limit);
    res.send(users);
  },

  // get a user
  get: async (req, res, next) => {
    const status = req.query.status;
    const value = req.query.value;
    var user;
    var condition = {};

    // query validation
    if (status == undefined || value == undefined){
      res.status(500).json({
        message: process.env.INCORRECT_INFO, success: false
      });
      return;
    }

    // check status
    switch (status) {
      case query.TELEPHONE:
        condition = { telephone: value, active: true };
        break;
      case query.EMAIL:
          condition = { email: value, active: true };
          break;
      case query.ID:
        condition = { _id: value, active: true };
        break;
      default:
        res.status(500).json({
          message: process.env.INCORRECT_INFO, success: false
        });
        return;
    }

    user = await User.findOne(condition);
    res.send(user);
  },

  // registation
  register: async (req, res, next) => {
    const token = await req.query.access_token;
    // query validation
    if (token == undefined) {
      res.status(500).json({
        message: process.env.INCORRECT_INFO, success: false
      });
      return;
    }

    // create a new user
    const newUser = User(req.body);
    newUser._id = mongoose.Types.ObjectId();
    newUser.password = newUser.generateHash(newUser.password);

    if(newUser.email == null)
      newUser.email = "example@gmail.com";

    const user = await newUser.save();
    res.send(user);
  },

  // admin login
  login: async (req, res, next) => {

    const token = await req.query.access_token;
    // query validation
    if (token == undefined) {
      res.status(500).json({
        message: process.env.INCORRECT_INFO, success: false
      });
      return;
    }

    // start check user login
    const user = await User.findOne({telephone: req.body.telephone});
    if (user) {
      if (!user.validPassword(req.body.password)) {
        // invalid password
        res.status(202).json({
          message: process.env.INVALID_PASSWORD, success: false
        });
      } else if (!user.active) {
        // account has been blocked. (desactive)
        res.status(202).json({
          message: process.env.ACCOUNT_HAS_BLOCKED, success: false
        });
      } else {
        // correct information
        res.send(user);
      }
    } else {
      // telephone doesn't exists
      res.status(202).json({
        message: process.env.TELEPHONE_NOT_EXISTS, success: false
      });
    }
  },
  // update information
  update: async (req, res, next) => {
    const user = await User.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(user) {
      // retreive a document by id
      User.findById(req.params.id).then(function(data){
         res.send(data);
      });
    } else {
      res.status(500).json({
       message: process.env.NOT_FOUNT, success: false
      });
    }
  },
  // desactive
  desactive: async (req, res, next) => {
    const user = await User.findOne({_id: req.params.id});
    user.active = false;
    const result = await user.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const user = await User.findOne({_id: req.params.id});
    user.active = true;
    const result = await user.save();
    res.send(result);
  }
};
