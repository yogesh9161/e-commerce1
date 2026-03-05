import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, name, image, price } = body;

    await db.execute(
      "INSERT INTO shoppingcart (productId,name,image,price,quantity) VALUES (?,?,?,?,1)",
      [productId, name, image, price]
    );

    return NextResponse.json({ message: "Added Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}

// GET CART
export async function GET() {
  const [rows] = await db.execute("SELECT * FROM shoppingcart ORDER BY id DESC");
  return NextResponse.json(rows);
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await db.execute(
      "DELETE FROM shoppingcart WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Delete Failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, quantity } = await req.json();

  await db.execute(
    "UPDATE shoppingcart SET quantity=? WHERE id=?",
    [quantity, id]
  );

  return NextResponse.json({
    message: "Quantity Updated",
  });
}


