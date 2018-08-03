const mongoose = require('mongoose'),
Schema = mongoose.Schema;
// https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');

// create User Schema & Model
const UserSchema = new Schema({
  khmerName: {
    firstName: String,
    lastName: String
  },
  englishName: {
    firstName: {
      type: String,
      required: [true, 'First Name (English) field is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last Name (English) field is required']
    }
  },
  username: {
    type: String,
    required: [true, 'Username field is required']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  telephone: {
    type: String,
    index: true,
    required: [true, 'Telephone field is required']
  },
  password: {
    type: String,
    required: [true, 'Password field is required']
  },
  gender: String,
  birthday: Date,
  image: {
    profileUrl: {
      type: String,
      default: "person_placeholder"
    },
    coverUrl: {
      type: String,
      default: "person_placeholder"
    },
  },
  tokens: [String],
  setting: {
    isNotify: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: "en-US"
    }
  },
  active: {
    type: Boolean,
    default: true,
    index: true
  }
}, {timestamps: true});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('user', UserSchema);
module.exports = User;
