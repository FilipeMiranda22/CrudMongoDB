import connectMongoDB from "@/database/mongodb";
import State from "@/models/state";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const state = await State.find();
    return NextResponse.json({ state });
  } catch (error) {
    console.error("Erro ao obter estados:", error.message);
    return NextResponse.json(
      { error: "Erro ao obter estados" },
      { status: 500 }
    );
  }
}
