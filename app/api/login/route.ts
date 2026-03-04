import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const [rows]: any = await db.execute(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "Invalid Email or Password" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Login Success" });
}



