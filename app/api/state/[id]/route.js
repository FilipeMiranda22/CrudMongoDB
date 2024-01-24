import connectMongoDB from "@/database/mongodb";
import City from "@/models/city";
import State from "@/models/state";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Extrai o ID do estado da URL
    const { id } = params;

    // Conecta-se ao banco de dados MongoDB
    await connectMongoDB();

    // Busca o estado pelo ID
    const state = await State.findById(id);

    // Se o estado não existir, retorna um erro 404
    if (!state) {
      return NextResponse.json(
        { error: "Estado não encontrado" },
        { status: 404 }
      );
    }

    // Busca as cidades associadas a esse estado pelo campo state no modelo City
    const cities = await City.find({ state: state._id });

    // Retorna as cidades do estado
    return NextResponse.json({ cities });
  } catch (error) {
    console.error("Erro ao obter cidades do estado:", error.message);
    return NextResponse.json(
      { error: "Erro ao obter cidades do estado" },
      { status: 500 }
    );
  }
}
