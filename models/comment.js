const mongoose = require('mongoose'),
UserSchema = require('./user').schema,
Schema = mongoose.Schema;

// create Comment Schema & Model
const CommentSchema = new Schema({
  text: String,
  imageUrl: String,
  hasImage: {
    type: Boolean,
    default: false
  },
  discussionId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Discussion ID field is required']
  },
  author: {
    type: UserSchema,
    ref: 'user',
    required: [true, 'Author field is required']
  },
  commentAt: {
    type: Date,
    default: Date.now
  },
  isReply: {
    type: Boolean,
    default: false
  },
  replyTo: this,
  active: {
    type: Boolean,
    default: true,
    index: true
  }
});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
