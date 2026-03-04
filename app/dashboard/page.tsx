"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Dashboard() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editQuantity, setEditQuantity] = useState<number>(1);

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // ================= LOAD =================
  const loadCart = async () => {
    const res = await fetch("/api/cartform", { cache: "no-store" });
    const data = await res.json();
    setCartItems(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ================= DELETE =================
  const deleteItem = async (id: number) => {
    await fetch("/api/cartform", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadCart();
  };

  // ================= UPDATE =================
  const updateItem = async (id: number) => {
    await fetch("/api/cartform", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: editName,
        price: editPrice,
        quantity: editQuantity,
      }),
    });

    setEditingId(null);
    loadCart();
  };

  // ================= ADD PRODUCT =================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (file) {
      formData.append("image", file);
    }

    await fetch("/api/cartform", {
      method: "POST",
      body: formData,
    });

    e.target.reset();
    setPreview(null);
    setOpen(false);
    loadCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Products Cart
        </h2>

        {/* ADD BUTTON */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            + Add Product
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Product</th>
              <th className="p-3">Image</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.id}</td>

                {/* NAME */}
                <td className="p-3">
                  {editingId === item.id ? (
                    <input
                      className="border p-1 rounded text-center"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>

                {/* IMAGE */}
                <td className="p-3 flex justify-center">
                  <img
                    src={item.image}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                {/* PRICE */}
                <td className="p-3 font-semibold text-green-600">
                  {editingId === item.id
                    ? `₹${editPrice * editQuantity}`
                    : `₹${item.price * item.quantity}`}
                </td>

                {/* QUANTITY */}
                <td className="p-3">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      className="border p-1 w-16 rounded text-center"
                      value={editQuantity}
                      onChange={(e) =>
                        setEditQuantity(Number(e.target.value))
                      }
                    />
                  ) : (
                    item.quantity
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex justify-center gap-3">
                  {editingId === item.id ? (
                    <button
                      onClick={() => updateItem(item.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditName(item.name);
                        setEditPrice(item.price);
                        setEditQuantity(item.quantity);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cartItems.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No Products Found
          </p>
        )}
      </div>

      {/* ================= ADD PRODUCT MODAL ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h1 className="text-xl font-bold">Add Product</h1>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="file"
                required
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) {
                    setFile(selected);
                    setPreview(URL.createObjectURL(selected));
                  }
                }}
                className="w-full border p-2 rounded"
              />

              {preview && (
                <img
                  src={preview}
                  className="h-40 w-full object-cover rounded"
                />
              )}

              <input
                name="name"
                placeholder="Product Name"
                className="border p-2 w-full rounded"
                required
              />

              <input
                name="price"
                type="number"
                placeholder="Price"
                className="border p-2 w-full rounded"
                required
              />

              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                className="border p-2 w-full rounded"
                required
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { X } from "lucide-react";

// export default function Dashboard() {
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [editName, setEditName] = useState("");
//   const [editPrice, setEditPrice] = useState<number>(0);
//   const [editQuantity, setEditQuantity] = useState<number>(1);

//   const [open, setOpen] = useState(false); 
//   const [preview, setPreview] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);

//   const loadCart = async () => {
//     const res = await fetch("/api/cartform", { cache: "no-store" });
//     const data = await res.json();
//     setCartItems(data);
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   // ================= DELETE =================
//   const deleteItem = async (id: number) => {
//     await fetch("/api/cartform", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });

//     loadCart();
//   };

//   // ================= UPDATE =================
//   const updateItem = async (id: number) => {
//     await fetch("/api/cartform", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         id,
//         name: editName,
//         price: editPrice,
//         quantity: editQuantity,
//       }),
//     });

//     setEditingId(null);
//     loadCart();
//   };

//   // ================= ADD PRODUCT =================
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);

//     if (file) {
//       formData.append("image", file);
//     }

//     await fetch("/api/cartform", {
//       method: "POST",
//       body: formData,
//     });

//     e.target.reset();
//     setPreview(null);
//     setOpen(false);
//     loadCart();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">

//       <div className="bg-white shadow-xl rounded-2xl p-8 relative">
//         <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
//           Products Cart
//         </h2>

        
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => setOpen(true)}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//           >
//             + Add Product
//           </button>
//         </div>

    
//         <table className="w-full border-collapse text-center">
//           <thead>
//             <tr className="bg-blue-600 text-white">
//               <th className="p-3">ID</th>
//               <th className="p-3">Product</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Quantity</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {cartItems.map((item) => (
//               <tr key={item.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{item.id}</td>
//                 <td className="p-3">{item.name}</td>
//                 <td className="p-3 flex justify-center">
//                   <img
//                     src={item.image}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 </td>
//                 <td className="p-3 text-green-600 font-semibold">
//                   ₹{item.price * item.quantity}
//                 </td>
//                 <td className="p-3">{item.quantity}</td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => deleteItem(item.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

    
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
//           onClick={() => setOpen(false)}
//         >
//           <div
//             className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between mb-4">
//               <h1 className="text-xl font-bold">Add Product</h1>
//               <button onClick={() => setOpen(false)}>
//                 <X />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="file"
//                 required
//                 onChange={(e) => {
//                   const selected = e.target.files?.[0];
//                   if (selected) {
//                     setFile(selected);
//                     setPreview(URL.createObjectURL(selected));
//                   }
//                 }}
//                 className="w-full border p-2 rounded"
//               />

//               {preview && (
//                 <img
//                   src={preview}
//                   className="h-40 w-full object-cover rounded"
//                 />
//               )}

//               <input
//                 name="name"
//                 placeholder="Product Name"
//                 className="border p-2 w-full rounded"
//                 required
//               />

//               <input
//                 name="price"
//                 type="number"
//                 placeholder="Price"
//                 className="border p-2 w-full rounded"
//                 required
//               />

//               <input
//                 name="quantity"
//                 type="number"
//                 placeholder="Quantity"
//                 className="border p-2 w-full rounded"
//                 required
//               />

//               <button className="w-full bg-blue-600 text-white py-2 rounded">
//                 Add Product
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



