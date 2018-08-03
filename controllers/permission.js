const mongoose = require('mongoose');
// import models
const Permission = require('../models/permission');

module.exports = {
  // get all active records
  index: async (req, res, next) => {
    const permissions = await Permission.find({active: true, schoolId: req.params.schoolId});
    res.send(permissions);
  },

  // get a record
  getItem: async (req, res, next) => {
    const permission = await Permission.findOne({userId: req.params.userId});
    if(permission) {
      if(permission.active) {
        // correct information
        res.send(permission);
      } else{
        // desactive
        res.status(202).json({
         message: process.env.ACCOUNT_HAS_BLOCKED, success: false
        });
      }
    } else{
      res.status(202).json({
       message: process.env.NOT_PERMISSION, success: false
      });
    }
  },

  // insert a new record
  create: async (req, res, next) => {
    const newPermission = Permission(req.body);
    newPermission._id = mongoose.Types.ObjectId();
    const permission = await newPermission.save();
    res.send(permission);
  },

  // update information
  update: async (req, res, next) => {
    const permission = await Permission.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(permission) {
      // retreive a document by id
      Permission.findById(req.params.id).then(function(data){
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
    const permission = await Permission.findOne({_id: req.params.id});
    permission.active = false;
    const result = await permission.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const permission = await Permission.findOne({_id: req.params.id});
    permission.active = true;
    const result = await permission.save();
    res.send(result);
  }

};
