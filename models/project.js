const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create Project Schema & Model
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  description: String,
  projectImage: String,
  features: [String],
  technologies: [String],
  downloadUrl: {
    type: String,
    required: [true, 'Download Url field is required']
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: [true, 'Student Id field is required']
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'subject',
    required: [true, 'Subject Id field is required']
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

const Project = mongoose.model('project', ProjectSchema);
module.exports = Level;
