const mongoose = require('mongoose');
// import models
const Room = require('../models/room');

module.exports = {
  // get all active records
  index: async (req, res, next) => {
    const rooms = await Room.find({active: true, schoolId: req.params.schoolId}).sort({name: 1});
    res.send(rooms);
  },

  // insert a new record
  create: async (req, res, next) => {
    const newRoom = Room(req.body);
    newRoom._id = mongoose.Types.ObjectId();
    const room = await newRoom.save();
    res.send(room);
  },

  // update information
  update: async (req, res, next) => {
    const room = await Room.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(room) {
      // retreive a document by id
      Room.findById(req.params.id).then(function(data){
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
    const room = await Room.findOne({_id: req.params.id});
    room.active = false;
    const result = await room.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const room = await Room.findOne({_id: req.params.id});
    room.active = true;
    const result = await room.save();
    res.send(result);
  }

};
