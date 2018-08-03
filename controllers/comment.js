const mongoose = require('mongoose');
// import models
const Comment = require('../models/comment');

module.exports = {
  // get all active records
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
    const comments = await Comment.find({active: true, discussionId: req.params.discussionId}).skip(skip).limit(limit);
    res.send(comments);
  },

  // insert a new record
  create: async (req, res, next) => {
    // req.body.isReply = "d";
    const newComment = Comment(req.body);
    newComment._id = mongoose.Types.ObjectId();
    const comment = await newComment.save();
    res.send(comment);
  },

  // update information
  update: async (req, res, next) => {
    const comment = await Comment.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(comment) {
      // retreive a document by id
      Comment.findById(req.params.id).then(function(data){
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

    const comment = await Comment.findOne({_id: req.params.id});
    comment.active = false;
    const result = await comment.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const comment = await Comment.findOne({_id: req.params.id});
    comment.active = true;
    const result = await comment.save();
    res.send(result);
  }

};
