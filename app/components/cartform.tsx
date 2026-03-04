




"use client";

import { useState } from "react";

export default function CartForm() {

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (file) {
      formData.append("image", file);
    }

    const res = await fetch("/api/cartform", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    e.target.reset();
    setPreview(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Add Product
        </h1>

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) {
              setFile(selected);
              setPreview(URL.createObjectURL(selected));
            }
          }}
          className="w-full border p-2 rounded-lg"
        />

        {preview && (
          <img src={preview} className="h-40 w-full object-cover" />
        )}

        <input name="name" placeholder="Product Name" className="border p-2 w-full rounded" required />
         <textarea name="description" placeholder="Description" className="border p-2 w-full rounded" required />         <input name="price" type="number" placeholder="Price" className="border p-2 w-full rounded" required />
        <input name="quantity" type="number"
         placeholder="Quantity" className="border p-2 w-full rounded" required />
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Add Product
        </button>
      </form>
    </div>
  );
}


