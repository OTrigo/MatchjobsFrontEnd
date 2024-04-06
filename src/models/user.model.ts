const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:{
    type: 'string',
    required: true
  },
  password:{
    type: 'string',
    required: true,
    minlength: 8
  }
})

const UserModel = mongoose.model('User, userSchema');

export default { userSchema, UserModel }