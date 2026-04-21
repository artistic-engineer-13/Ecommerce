const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],  // only these 2 values allowed
    default: 'buyer'
  }
},{ timestamps: true })

const User = mongoose.model('User',userSchema)
module.exports = User;