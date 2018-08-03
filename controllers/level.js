const mongoose = require('mongoose');
// import models
const Level = require('../models/level');

module.exports = {
  // get all active records
  index: async (req, res, next) => {
    const levels = await Level.find({active: true, schoolId: req.params.schoolId}).sort({name: 1});
    res.send(levels);
  },

  // insert a new record
  create: async (req, res, next) => {
    const newLevel = Level(req.body);
    newLevel._id = mongoose.Types.ObjectId();
    const level = await newLevel.save();
    res.send(level);
  },

  // update information
  update: async (req, res, next) => {
    const level = await Level.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(level) {
      // retreive a document by id
      Level.findById(req.params.id).then(function(data){
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
    const level = await Level.findOne({_id: req.params.id});
    level.active = false;
    const result = await level.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const level = await Level.findOne({_id: req.params.id});
    level.active = true;
    const result = await level.save();
    res.send(result);
  }

};
