import mongoose, { Schema } from "mongoose";

const personSchema = new Schema(
  {
    name: String,
    email: String,
    state: String,
    city: String,
    hobbies: {
      type: [String], // Indica que é um array de strings
      default: [], // Pode ser útil definir um valor padrão como um array vazio
      validate: {
        validator: function (value) {
          // Adicione uma validação personalizada se necessário
          // Por exemplo, você pode verificar se cada valor no array é uma string
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
