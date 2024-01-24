import connectMongoDB from "@/database/mongodb";
import Person from "@/models/person";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, state, city, hobbies } = await request.json();
    await connectMongoDB();
    const person = await Person.create({ name, email, state, city, hobbies });
    if (!person) {
      throw new Error("Não foi possível criar uma pessoa");
    }
    return NextResponse.json({ message: "Pessoa criada" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar pessoa:", error.message);
    return NextResponse.json(
      { error: "Erro ao criar pessoa" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const people = await Person.find();
    return NextResponse.json({ people });
  } catch (error) {
    console.error("Erro ao obter pessoas:", error.message);
    return NextResponse.json(
      { error: "Erro ao obter pessoas" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    const person = await Person.findByIdAndDelete(id);
    if (!person) {
      throw new Error("Não foi possível encontrar essa pessoa para deletar");
    }
    return NextResponse.json({ message: "Pessoa deletada" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error.message);
    return NextResponse.json(
      { error: "Erro ao excluir pessoa" },
      { status: 500 }
    );
  }
}
