const mongoose = require('mongoose');
// import models
const Subject = require('../models/subject');

module.exports = {
  // get all records active
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
    const id = mongoose.Types.ObjectId(req.params.schoolId);
    const subjects = await Subject.aggregate([
       {
         // join here
         $lookup:
           {
             from: "departments", // join collection
             localField: "departmentId", // primary key
             foreignField: "_id", // foreign key
             as: "department" // new name alias
           }
      },
      { $unwind: "$department" },
      {
        // join here
        $lookup:
          {
            from: "levels", // join collection
            localField: "levelId", // primary key
            foreignField: "_id", // foreign key
            as: "level" // new name alias
          }
      },
      { $unwind: "$level" },
      //  set condition here
      { $match: { schoolId: id, active: true } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      // select or unselect fields here
      { $project : {
          "createdAt": 0,
          "department.createdAt": 0,
          "department.updatedAt": 0,
          "level.createdAt": 0,
          "level.updatedAt": 0,
        }
      }
    ]);

    res.send(subjects);
  },
  // get all records active
  getById: async (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const subjects = await Subject.aggregate([
       {
         // join here
         $lookup:
           {
             from: "departments", // join collection
             localField: "departmentId", // primary key
             foreignField: "_id", // foreign key
             as: "department" // new name alias
           }
      },
      {
        // join here
        $lookup:
          {
            from: "levels", // join collection
            localField: "levelId", // primary key
            foreignField: "_id", // foreign key
            as: "level" // new name alias
          }
      },
      { $unwind: "$level" },
      //  set condition here
      { $match: { _id: id } },
      { $unwind: "$department" },
      // select or unselect fields here
      { $project : { "createdAt": 0, "department.createdAt": 0, "department.updatedAt": 0 } }
    ]);


    res.send(subjects[0]);
  },

  // insert a new record
  create: async (req, res, next) => {
    const newSubject = Subject(req.body);
    newSubject._id = mongoose.Types.ObjectId();
    const subject = await newSubject.save();
    res.send(subject);
  },

  // update information
  update: async (req, res, next) => {
    const subject = await Subject.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(subject) {
      // retreive a document by id
      Subject.findById(req.params.id).then(function(data){
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
    const subject = await Subject.findOne({_id: req.params.id});
    subject.active = false;
    const result = await subject.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const subject = await Subject.findOne({_id: req.params.id});
    subject.active = true;
    const result = await subject.save();
    res.send(result);
  },

  // insert a new record
  insertLesson: async (req, res, next) => {
    const subject = await Subject.findById(req.params.subjectId);
    const index = subject.lessons.findIndex(x => x.id == req.body._id);
    if(index == -1) {
      req.body._id = mongoose.Types.ObjectId();
      const count = subject.lessons.length;
      subject.lessons[count] = req.body;
      await subject.save();
      res.send(req.body);
    } else {
      res.status(500).json({
        message: process.env.ID_EXISTS, success: false
      });
    }
  },

  // update information
  updateLesson: async (req, res, next) => {
    const subject = await Subject.findById(req.params.subjectId);
    const index = subject.lessons.findIndex(x => x.id == req.body._id);

    if(index == -1) {
      res.status(500).json({
        message: process.env.ID_NOT_EXISTS, success: false
      });
      return;
    }

    subject.lessons[index] = req.body;
    await subject.save();
    res.send(req.body);
  },

  // remove record
  removeLesson: async (req, res, next) => {
    const subject = await Subject.findById(req.params.subjectId);
    const index = subject.lessons.findIndex(x => x._id == req.params.lessonId);

    if(index == -1) {
      res.status(500).json({
        message: process.env.ID_NOT_EXISTS, success: false
      });
      return;
    }

    subject.lessons.splice(index, 1);
    await subject.save();
    res.send(req.body);
  }

};
