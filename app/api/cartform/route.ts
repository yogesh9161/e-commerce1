import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ================= GET PRODUCTS =================
export async function GET() {
  try {
    const [rows]: any = await db.execute(
      "SELECT * FROM cartform ORDER BY id DESC"
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}

// ================= ADD PRODUCT =================
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name: any = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const file = formData.get("image") as File;

    // 🔥 SLUG CREATE
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + file.name;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(path.join(uploadDir, fileName), buffer);

    const imageUrl = `/uploads/${fileName}`;

    await db.execute(
      "INSERT INTO cartform (name, description, price, quantity, image, slug) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, quantity, imageUrl, slug]
    );

    return NextResponse.json({ message: "Product Added ✅" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

// ================= DELETE PRODUCT =================
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await db.execute("DELETE FROM cartform WHERE id = ?", [id]);

    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Delete Failed" }, { status: 500 });
  }
}

// ================= UPDATE PRODUCT =================
// export async function PUT(req: Request) {
//   try {
//     const { id, quantity } = await req.json();

//     await db.execute(
//       "UPDATE cartform SET quantity = ? WHERE id = ?",
//       [quantity, id]
//     );

//     return NextResponse.json({ message: "Updated Successfully" });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Update Failed" }, { status: 500 });
//   }
// }

export async function PUT(req: Request) {
  try {
    const { id, name, price, quantity } = await req.json();

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    await db.execute(
      "UPDATE cartform SET name = ?, price = ?, quantity = ?, slug = ? WHERE id = ?",
      [name, price, quantity, slug, id]
    );

    return NextResponse.json({ message: "Updated Successfully" });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Update Failed" }, { status: 500 });
  }
}




