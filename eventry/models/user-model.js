import mongoose, {Schema} from "mongoose";

const schema = new Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  phone: {
    required: true,
    type: String
  },
  bio: {
    required: false,
    type: Array
  },
});


export const userModel = mongoose.models.users ?? mongoose.model("users", schema);