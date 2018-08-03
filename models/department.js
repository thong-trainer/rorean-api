const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create Department Schema & Model
const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  description: String,
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

const Department = mongoose.model('department', DepartmentSchema);
module.exports = Department;
