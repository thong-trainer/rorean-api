const mongoose = require('mongoose');
// import models
const Post = require('../models/post');

module.exports = {
  // get all active records
  index: async (req, res, next) => {
    const posts = await Post.find({active: true, "school._id": req.params.schoolId}).sort({createdAt: -1});
    res.send(posts);
  },

  // insert a new record
  create: async (req, res, next) => {
    const newPost = Post(req.body);
    newPost._id = mongoose.Types.ObjectId();
    const post = await newPost.save();
    res.send(post);
  },

  // update information
  update: async (req, res, next) => {

    const post = await Post.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(post) {
      // retreive a document by id
      Post.findById(req.params.id).then(function(data){
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
    const post = await Post.findOne({_id: req.params.id});
    post.active = false;
    const result = await post.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const post = await Post.findOne({_id: req.params.id});
    post.active = true;
    const result = await post.save();
    res.send(result);
  }

};
