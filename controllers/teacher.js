const mongoose = require('mongoose');
const Transaction = require('mongoose-transactions')
const transaction = new Transaction();
// import models
const Teacher = require('../models/teacher');
const User = require('../models/user');
// name of the registered schema (for transaction)
const teacherSchema = "teacher";
const userSchema = "user";

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
    const teachers = await Teacher.aggregate([
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

    res.send(teachers);
  },

  // get a record by id
  getById: async (req, res, next) => {
    const id = req.params.id;
    const schoolId = req.params.schoolId;
    const teacher = await Teacher.findOne({ $or: [{_id: id}, {userId: id}], schoolId: schoolId});
    res.send(teacher);
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
      // create a new teacher
      const newTeacher = Teacher(req.body);
      newTeacher._id = mongoose.Types.ObjectId();
      transaction.insert(teacherSchema, newTeacher)
      // retrieve user by id
      const user = await User.findById(newTeacher.userId);
      user.khmerName = req.body.user.khmerName;
      user.englishName = req.body.user.englishName;
      user.email = req.body.user.email;
      user.birthday = req.body.user.birthday;
      // update user information
      transaction.update(userSchema, user.id, user);
      // execute transaction
      const final = await transaction.run()
      // return result
      res.send(newTeacher);

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
      // update teacher information
      transaction.update(teacherSchema, req.params.id, req.body);
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
    const teacher = await Teacher.findOne({_id: req.params.id});
    teacher.active = false;
    const result = await teacher.save();
    res.send(result);
  },

  // active
  active: async (req, res, next) => {
    const teacher = await Teacher.findOne({_id: req.params.id});
    teacher.active = true;
    const result = await teacher.save();
    res.send(result);
  }
};
