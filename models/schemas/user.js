const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');//todo: set up env for privatekey

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    isAdmin:{
      type: Boolean,
      default: false
    }
  });
  
  userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin
      },
      config.get("jwtPrivateKey")
    );
    return token;
  };
  
const User = mongoose.model("User", userSchema);

exports.User = User;