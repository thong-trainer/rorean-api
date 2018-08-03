const mongoose = require('mongoose');
// import models
const Department = require('../models/department');

module.exports = {
  // get all records active
  index: async (req, res, next) => {
    const departments = await Department.find({active: true, schoolId: req.params.schoolId}).sort({name: 1});
    res.send(departments);
  },

  // get a record
  getById: async (req, res, next) => {
    const department = await Department.findById(req.params.id);
    res.send(department);
  },

  // insert a new record
  create: async (req, res, next) => {
    const newDepartment = Department(req.body);
    newDepartment._id = mongoose.Types.ObjectId();
    const department = await newDepartment.save();
    res.send(department);
  },

  // update information
  update: async (req, res, next) => {
    const department = await Department.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(department) {
      // retreive a document by id
      Department.findById(req.params.id).then(function(data){
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
    const department = await Department.findOne({_id: req.params.id});
    department.active = false;
    const result = await department.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const department = await Department.findOne({_id: req.params.id});
    department.active = true;
    const result = await department.save();
    res.send(result);
  }

};
