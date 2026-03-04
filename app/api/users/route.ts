import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// GET USERS
export async function GET() {
  try {
    const [rows]: any = await db.execute(
      "SELECT id, name, email FROM users ORDER BY id DESC"
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}


// DELETE USER
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await db.execute("DELETE FROM users WHERE id = ?", [id]);

    return NextResponse.json({ message: "User Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE USER
export async function PUT(req: Request) {
  try {
    const { id, name, email } = await req.json();

    await db.execute(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    return NextResponse.json({ message: "User Updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}