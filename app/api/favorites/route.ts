import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [rows] = await db.execute("SELECT * FROM favorites");
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { productId, name, image, price } = body;

    await db.execute(
      "INSERT INTO favorites (productId,name,image,price) VALUES (?,?,?,?)",
      [productId, name, image, price]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Insert failed" });
  }
}

/* ✅ DELETE FUNCTION ADD */
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await db.execute("DELETE FROM favorites WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" });
  }
}