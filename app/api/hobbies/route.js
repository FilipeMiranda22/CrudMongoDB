import connectMongoDB from "@/database/mongodb";
import Hobbie from "@/models/hobbie";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const hobbies = await Hobbie.find();
    return NextResponse.json({ hobbies });
  } catch (error) {
    console.error("Erro ao obter hobbies:", error.message);
    return NextResponse.json(
      { error: "Erro ao obter hobbies" },
      { status: 500 }
    );
  }
}
