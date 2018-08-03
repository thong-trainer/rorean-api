const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create Permission Schema & Model
const PermissionSchema = new Schema({
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
  role: {
    type: String,
    required: [true, 'Role (admin, editor) field is required']
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

const Permission = mongoose.model('permission', PermissionSchema);
module.exports = Permission;
