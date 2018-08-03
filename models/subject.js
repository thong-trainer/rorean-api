const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create Subject Schema & Model
const SubjectSchema = new Schema({
  title: {
    type: String,
    index: true,
    required: [true, 'Title field is required']
  },
  price: {
    type: Number,
    required: [true, 'Price field is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration field is required']
  },
  subtitle1: String,
  subtitle2: String,
  requirement: String,
  description: String,
  imageUrl: String,
  lessons: [{
    name: String,
    documentUrl: String
  }],
  levelId: {
    type: Schema.Types.ObjectId,
    ref: 'level',
    required: [true, 'Level Id field is required']
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'department',
    required: [true, 'Department Id field is required']
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'school',
    required: [true, 'School Id field is required']
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'CreatedBy field is required']
  },
  active: {
    type: Boolean,
    default: true,
    index: true
  }
}, {timestamps: true});

const Subject = mongoose.model('subject', SubjectSchema);
module.exports = Subject;
