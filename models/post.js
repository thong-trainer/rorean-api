const mongoose = require('mongoose'),
SubjectSchema = require('./subject').schema,
SchoolSchema = require('./school').schema,
StudentSchema = require('./student').schema,
Schema = mongoose.Schema;

// create Post Schema & Model
const PostSchema = new Schema({
  caption: {
    type: String,
    required: [true, 'Caption field is required']
  },
  description: String,
  imageUrls: [String],
  subject: SubjectSchema,
  school: {
    type: SchoolSchema,
    required: [true, 'School field is required']
  },
  openDate: {
    type: Date,
    required: [true, 'Open Date field is required']
  },
  students: [StudentSchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'CreatedBy field is required']
  },
  status: {
    type: String,
    required: [true, 'Status (subject, announcement) field is required']
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

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
