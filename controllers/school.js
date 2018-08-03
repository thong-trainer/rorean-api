const mongoose = require('mongoose');
// import models
const School = require('../models/school');

module.exports = {
  // get all schools active
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
    const schools = await School.find({active: true}).skip(skip).limit(limit);
    res.send(schools);
  },

  // get the school by id
  getById: async (req, res, next) => {
    const school = await School.findOne({_id: req.params.id, active: true});
    res.send(school);
  },

  // registation
  register: async (req, res, next) => {

    // create a new school
    const newSchool = School(req.body);
    newSchool._id = mongoose.Types.ObjectId();

    const school = await newSchool.save();

    res.send(school);
  },

  // update information
  update: async (req, res, next) => {
    const school = await School.findByIdAndUpdate({_id: req.params.id}, req.body);
     if(school) {
       // retreive a document by id
       School.findById(req.params.id).then(function(data){
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
    const school = await School.findOne({_id: req.params.id});
    school.active = false;
    const result = await school.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const school = await School.findOne({_id: req.params.id});
    school.active = true;
    const result = await school.save();
    res.send(result);
  }

};
