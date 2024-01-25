import connectMongoDB from "@/database/mongodb";
import Hobby from "@/models/hobby";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const hobbies = await Hobby.find();
    return NextResponse.json({ hobbies });
  } catch (error) {
    console.error("Erro ao obter hobbies:", error.message);
    return NextResponse.json(
      { error: "Erro ao obter hobbies" },
      { status: 500 }
    );
  }
}
