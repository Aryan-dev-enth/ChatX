import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userModel = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  pfp: {
    type: String,
    required: true,
    default: 'https://img.freepik.com/free-icon/user_318-804790.jpg'
  }
},{
    timestamps: true
});

const User= mongoose.model("User", userModel);
export default User;
