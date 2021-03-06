const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create Teacher Schema & Model
const TeacherSchema = new Schema({
  fullNameKH: {
    type: String,
    required:[true, "Fullname (KH) field is required (include full both name)"]
  },
  fullNameEN: {
    type: String,
    required:[true, "Fullname (EN) field is required (include full both name)"]
  },
  profileUrl: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User Id field is required']
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
  keywords: [{
      type: String,
      index: true
  }],  
  active: {
    type: Boolean,
    default: true,
    index: true
  }
}, {timestamps: true});


const Teacher = mongoose.model('teacher', TeacherSchema);
module.exports = Teacher;
