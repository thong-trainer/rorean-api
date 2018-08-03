const mongoose = require('mongoose');
// import models
const Classroom = require('../models/classroom');

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
    const id = mongoose.Types.ObjectId(req.params.schoolId);

    const classrooms = await Classroom.aggregate([
       {
         // join here
         $lookup:
           {
             from: "subjects", // join collection
             localField: "subjectId", // primary key
             foreignField: "_id", // foreign key
             as: "subject" // new name alias
           }
      },
      {
        $unwind: "$subject"
      },
      {
        // join here
        $lookup:
          {
            from: "teachers", // join collection
            localField: "teachBy", // primary key
            foreignField: "_id", // foreign key
            as: "teacher" // new name alias
          }
      },
      {
        $unwind: "$teacher"
      },
      {
        // join here
        $lookup:
          {
            from: "rooms", // join collection
            localField: "roomId", // primary key
            foreignField: "_id", // foreign key
            as: "room" // new name alias
          }
      },
      {
        $unwind: "$room"
      },
      // set condition here
      { $match: { schoolId: id, active: true } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      //select or unselect fields here
      { $project : { "teacher.createdBy": 0, "teacher.createdAt": 0, "teacher.updatedAt": 0 } }
    ]);

   res.send(classrooms);

  },

  // get list of records
  getList: async (req, res, next) => {

    const schoolId = mongoose.Types.ObjectId(req.params.schoolId);
    const id = mongoose.Types.ObjectId(req.params.id); // student id or teacher id

    const classrooms = await Classroom.aggregate([
       {
         // join here
         $lookup:
           {
             from: "subjects", // join collection
             localField: "subjectId", // primary key
             foreignField: "_id", // foreign key
             as: "subject" // new name alias
           }
      },
      {
        $unwind: "$subject"
      },
      {
        // join here
        $lookup:
          {
            from: "teachers", // join collection
            localField: "teachBy", // primary key
            foreignField: "_id", // foreign key
            as: "teacher" // new name alias
          }
      },
      {
        $unwind: "$teacher"
      },
      {
        // join here
        $lookup:
          {
            from: "rooms", // join collection
            localField: "roomId", // primary key
            foreignField: "_id", // foreign key
            as: "room" // new name alias
          }
      },
      {
        $unwind: "$room"
      },
      // set condition here
      { $match: { schoolId: schoolId, $or: [{teachBy: id}, {students: id}] } },
      { $sort: { createdAt: -1 } },

      //select or unselect fields here
      { $project : { "teacher.createdBy": 0, "teacher.createdAt": 0, "teacher.updatedAt": 0 } }
    ]);

    res.send(classrooms);
  },

  // get a record by id
  getById: async (req, res, next) => {

    const id = mongoose.Types.ObjectId(req.params.id);

    const classrooms = await Classroom.aggregate([
       {
         // join here
         $lookup:
           {
             from: "subjects", // join collection
             localField: "subjectId", // primary key
             foreignField: "_id", // foreign key
             as: "subject" // new name alias
           }
      },
      {
        $unwind: "$subject"
      },
      {
        // join here
        $lookup:
          {
            from: "teachers", // join collection
            localField: "teachBy", // primary key
            foreignField: "_id", // foreign key
            as: "teacher" // new name alias
          }
      },
      {
        $unwind: "$teacher"
      },
      {
        // join here
        $lookup:
          {
            from: "rooms", // join collection
            localField: "roomId", // primary key
            foreignField: "_id", // foreign key
            as: "room" // new name alias
          }
      },
      {
        $unwind: "$room"
      },
      // set condition here
      { $match: { _id: id } },
      { $sort: { createdAt: -1 } },

      //select or unselect fields here
      { $project : { "teacher.createdBy": 0, "teacher.createdAt": 0, "teacher.updatedAt": 0 } }
    ]);

    res.send(classrooms[0]);
  },


  // insert a new record
  create: async (req, res, next) => {
    const newClassroom = Classroom(req.body);
    newClassroom._id = mongoose.Types.ObjectId();
    const classroom = await newClassroom.save();
    res.send(classroom);
  },

  // update information
  update: async (req, res, next) => {
    const classroom = await Classroom.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(classroom) {
      // retreive a document by id
      Classroom.findById(req.params.id).then(function(data){
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
    const classroom = await Classroom.findOne({_id: req.params.id});
    classroom.active = false;
    const result = await classroom.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const classroom = await Classroom.findOne({_id: req.params.id});
    classroom.active = true;
    const result = await classroom.save();
    res.send(result);
  }

};
