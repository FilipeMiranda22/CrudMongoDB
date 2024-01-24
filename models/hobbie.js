import mongoose, { Schema } from "mongoose";

const hobbieSchema = new Schema({
  hobbie: String,
});

const Hobbie = mongoose.models.Hobbie || mongoose.model("Hobbie", hobbieSchema);

export default Hobbie;
