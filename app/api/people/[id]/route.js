import connectMongoDB from "@/database/mongodb";
import Person from "@/models/person";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      newName: name,
      newEmail: email,
      newState: state,
      newCity: city,
      newHobbies: hobbies,
    } = await request.json();
    await connectMongoDB();
    const person = await Person.findByIdAndUpdate(id, {
      name,
      email,
      state,
      city,
      hobbies,
    });
    if (!person) {
      throw new Error("Não foi possível encontrar uma pessoa para atualizar");
    }
    return NextResponse.json({ message: "Pessoa atualizada" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Pessoa não encontrada" },
      { status: 404 }
    );
  }
}
