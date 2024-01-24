import mongoose, { Schema } from "mongoose";

const stateSchema = new Schema({
  name: String,
  us: String,
});

const State = mongoose.models.State || mongoose.model("State", stateSchema);

export default State;
