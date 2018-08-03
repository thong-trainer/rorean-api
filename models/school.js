const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create School Schema & Model
const SchoolSchema = new Schema({
  schoolName: {
    type: String,
    index: true,
    required: [true, 'Username field is required']
  },
  category: {
    type: String,
    required: [true, 'Category field is required']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  phone: {
    office: String,
    support: String,
    mobile: String
  },
  location: {
    zipCode: Number,
    address: String,
    country: String
  },
  socialIds: [{
    name: String,
    url: String
  }],
  image: {
    profileUrl: String,
    coverUrl: String,
  },
  description: String,
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

const School = mongoose.model('school', SchoolSchema);
module.exports = School;
