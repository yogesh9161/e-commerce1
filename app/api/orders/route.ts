import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("✅ API HIT");

    const body = await req.json();

    const {
      full_name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      country,
      payment_method,
    } = body;

    await db.execute(
      `INSERT INTO orders
      (full_name,email,phone,address,city,state,pincode,country,payment_method)
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        full_name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        country,
        payment_method,
      ]
    );

    return NextResponse.json({ message: "Order Saved ✅" });

  } catch (error:any) {
    console.log("DB ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ....................................GEt pandrathuku.........................................
export async function GET() {
  try {
    const [rows]: any = await db.execute(
      "SELECT * FROM orders ORDER BY id DESC"
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}


// ........................................DELETE.................................
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await db.execute("DELETE FROM orders WHERE id = ?", [id]);

    return NextResponse.json({ message: "Order Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// ...............................edit pandrathuku..............................
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      full_name,
      email,
      phone,
      city,
      state,
      payment_method,
    } = body;

    await db.execute(
      `UPDATE orders 
       SET full_name=?, email=?, phone=?, city=?, state=?, payment_method=?
       WHERE id=?`,
      [full_name, email, phone, city, state, payment_method, id]
    );

    return NextResponse.json({ message: "Order Updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


