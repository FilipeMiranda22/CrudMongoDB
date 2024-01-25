import connectMongoDB from "@/database/mongodb";
import City from "@/models/city";
import State from "@/models/state";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    await connectMongoDB();

    const state = await State.findById(id);

    if (!state) {
      return NextResponse.json(
        { error: "Estado não encontrado" },
        { status: 404 }
      );
    }

    const cities = await City.find({ state: state._id });

    return NextResponse.json({ cities });
  } catch (error) {
    console.error("Erro ao obter cidades do estado:", error.message);
    return NextResponse.json(
      { error: "Erro ao obter cidades do estado" },
      { status: 500 }
    );
  }
}
