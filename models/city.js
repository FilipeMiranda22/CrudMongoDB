import mongoose, { Schema } from "mongoose";

const stateSchema = new Schema({
  name: String,
  state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
});

const City = mongoose.models.City || mongoose.model("City", stateSchema);

export default City;
