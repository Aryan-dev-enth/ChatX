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
    default: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'
  }
},{
    timestamps: true
});

const User= mongoose.model("User", userModel);
export default User;
