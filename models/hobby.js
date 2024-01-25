import mongoose, { Schema } from "mongoose";

const hobbySchema = new Schema({
  hobby: String,
});

const Hobby = mongoose.models.Hobby || mongoose.model("Hobby", hobbySchema);

export default Hobby;
