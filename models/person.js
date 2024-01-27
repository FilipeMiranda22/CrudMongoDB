import mongoose, { Schema } from "mongoose";

const personSchema = new Schema(
  {
    name: String,
    email: String,
    state: String,
    city: String,
    hobbies: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.every((item) => typeof item === "string")
          );
        },
        message: (props) =>
          `${props.value} não é um array válido de strings para hobbies!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.models.Person || mongoose.model("Person", personSchema);

export default Person;
