"use client";

import { useEffect, useState } from "react";
import {  CircleX} from "lucide-react";

export default function FavoritesPage() {
  const [items, setItems] = useState<any[]>([]);

  const loadFavorites = async () => {
    const res = await fetch("/api/favorites");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  /* ✅ DELETE FUNCTION */
  const handleDelete = async (id: number) => {
    await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    // UI la remove panna
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        My Favorites
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="shadow p-4 rounded-lg hover:shadow-xl transition duration-300 bg-white relative"
          >
            {/* ✅ DELETE ICON */}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              < CircleX size={20} />
            </button>

            <img
              src={item.image}
              className="h-40 w-full object-cover rounded-md"
            />

            <h2 className="mt-3 font-semibold truncate">
              {item.name}
            </h2>

            <p className="text-green-600 font-bold mt-1">
              ₹ {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";

// export default function FavoritesPage() {
//   const [items, setItems] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/favorites")
//       .then((res) => res.json())
//       .then((data) => setItems(data));
//   }, []);

//   return (
//     <div className="p-4 sm:p-6 md:p-10">
      
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6">
//         My Favorites
//       </h1>

//       {/* ✅ Responsive Grid */}
//       <div
//         className="
//           grid
//           grid-cols-1
//           sm:grid-cols-2
//           md:grid-cols-3
//           lg:grid-cols-4
//           gap-6
//         "
//       >
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="
//               shadow
//               p-4
//               rounded-lg
//               hover:shadow-xl
//               transition duration-300
//               bg-white
//             "
//           >
//             <img
//               src={item.image}
//               className="
//                 h-40
//                 w-full
//                 object-cover
//                 rounded-md
//               "
//             />

//             <h2 className="mt-3 font-semibold truncate">
//               {item.name}
//             </h2>

//             <p className="text-green-600 font-bold mt-1">
//               ₹ {item.price}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



