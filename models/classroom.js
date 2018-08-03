const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create Classroom Schema & Model
const ClassroomSchema = new Schema({
  name: String,
  schedule: {
    type: String,
    required: [true, 'Schedule field is required']
  },
  startHour: String,
  endHour: String,
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'subject',
    required: [true, 'Subject Id field is required']
  },
  teachBy: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
    required: [true, 'Teacher Id field is required']
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'school',
    required: [true, 'School Id field is required']
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'room',
    required: [true, 'Room Id field is required']
  },
  students: [{
      type: Schema.Types.ObjectId,
      ref: 'student'
  }],
  status: {
    type: String,
    required: [true, 'Status (opening, started, achived) field is required']
  },
  description: String,
  startedDate: Date,
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

const Classroom = mongoose.model('classroom', ClassroomSchema);
module.exports = Classroom;
