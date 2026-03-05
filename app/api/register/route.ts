import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const [existing]: any = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );

  return NextResponse.json({ message: "Registered Successfully" });
}