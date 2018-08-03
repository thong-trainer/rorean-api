const mongoose = require('mongoose');
const Transaction = require('mongoose-transactions')
const transaction = new Transaction();
// import models
const Student = require('../models/student');
const User = require('../models/user');
// name of the registered schema (for transaction)
const studentSchema = "student";
const userSchema = "user";
// global constant variable
const query = {
  USER: "user",
  STUDENT: "student"
};

module.exports = {
  // get all records
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
    const students = await Student.aggregate([
       {
         // join here
         $lookup:
           {
             from: "users", // join collection
             localField: "userId", // primary key
             foreignField: "_id", // foreign key
             as: "user" // new name alias
           }
      },
      //  set condition here
      { $match: { schoolId: id, active: true } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $unwind: "$user" },
      // select or unselect fields here
      { $project : { "users._id": 0, "users.createdAt": 0, "users.updatedAt": 0 } }
    ]);

    res.send(students);
  },

  // get a record by id
  getById: async (req, res, next) => {
    const id = req.params.id;
    const schoolId = req.params.schoolId;
    const student = await Student.findOne({ $or: [{_id: id}, {userId: id}], schoolId: schoolId });
    res.send(student);
  },

  // get list of record by ids
  getList: async (req, res, next) => {
    // split ids by comma
    var ids = req.query.ids.split(',');
    var array = [];
    // convert string id to array of ObjectId
    for (var i = 0; i < ids.length; i++) {
      array[i] = mongoose.Types.ObjectId(ids[i]);
    }

    const students = await Student.aggregate([
       {
         // join here
         $lookup:
           {
             from: "users", // join collection
             localField: "userId", // primary key
             foreignField: "_id", // foreign key
             as: "user" // new name alias
           }
      },
      //  set condition here
      { $match: { _id: { $in: array } } },
      { $sort: { fullNameKH: 1 } },
      { $unwind: "$user" },
      // select or unselect fields here
      { $project : { "users._id": 0, "users.createdAt": 0, "users.updatedAt": 0 } }
    ]);

  //  const students = await Student.find({ _id: { $in: array } });
    res.send(students);
  },

  // search documents
  search: async (req, res, next) => {


    const schoolId = req.params.schoolId;
    const search = req.params.search.toLowerCase();
    const limit = parseInt(req.params.limit, 0);
    const skip = req.params.index * limit;
    var students;

    if (search == "null") {
      students = await Student.find({ schoolId: schoolId }).skip(skip).limit(limit);
    }
    else {
      students = await Student.find({ schoolId: schoolId, keywords:  {$regex: search} }).skip(skip).limit(limit);
    }

    res.send(students);
  },

  // insert a new record
  create: async (req, res, next) => {
    try {
      // create keywords
      const keywords = [
        req.body.fullNameKH.toLowerCase(),
        req.body.fullNameEN.toLowerCase(),
        req.body.user.telephone,
      ];
      // create a new student
      const newStudent = Student(req.body);
      newStudent._id = mongoose.Types.ObjectId();
      newStudent.keywords = keywords;
      transaction.insert(studentSchema, newStudent)
      // retrieve user by id
      const user = await User.findById(newStudent.userId);
      user.khmerName = req.body.user.khmerName;
      user.englishName = req.body.user.englishName;
      user.email = req.body.user.email;
      user.birthday = req.body.user.birthday;
      // update user information
      transaction.update(userSchema, user.id, user);
      // execute transaction
      const final = await transaction.run()
      // return result
      res.send(newStudent);

    } catch (error) {
      // error and rollback
      console.error(error);
      const rollbackObj = await transaction.rollback().catch(console.error);
      transaction.clean();
      res.status(500).json({
        message: process.env.NOT_FOUNT, success: false
      });
    }
  },

  // update information
  update: async (req, res, next) => {
    try {
      // update keywords
      req.body.keywords = [
        req.body.fullNameKH.toLowerCase(),
        req.body.fullNameEN.toLowerCase(),
        req.body.user.telephone,
      ];
      console.log(req.body);
      // update student information
      transaction.update(studentSchema, req.params.id, req.body);
      // retrieve user by id
      const user = await User.findById(req.body.userId);
      user.khmerName = req.body.user.khmerName;
      user.englishName = req.body.user.englishName;
      user.email = req.body.user.email;
      user.birthday = req.body.user.birthday;
      // update user information
      transaction.update(userSchema, user.id, user);
      // execute transaction
      const final = await transaction.run()
      // send result
      res.send({
        message: process.env.SUCCESS, success: false
      });
    } catch (error) {
      // error and rollback
      console.error(error);
      const rollbackObj = await transaction.rollback().catch(console.error);
      transaction.clean();
      res.status(500).json({
        message: process.env.TRANSACTION_FAILED, success: false
      });
    }
  },

  // desactive
  desactive: async (req, res, next) => {
    const student = await Student.findOne({_id: req.params.id});
    student.active = false;
    const result = await student.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const student = await Student.findOne({_id: req.params.id});
    student.active = true;
    const result = await student.save();
    res.send(result);
  }
};
