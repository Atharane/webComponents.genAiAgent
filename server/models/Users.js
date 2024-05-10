import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "User Already exists"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: [6, "Minimum password length must be 6 characters"],
  },
  linkKey:{
    type: String,
  },
  DOMString:{
    type: String,
  }
});

const User = mongoose.model("user", UserSchema);

export default User;
