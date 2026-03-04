


"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ReceiptText } from "lucide-react";

export default function Shop() {

  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  /* ✅ NEW SEARCH STATE */
  const [searchTerm, setSearchTerm] = useState("");

  const productsPerPage = 8;

  useEffect(() => {
    fetch("/api/cartform")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // ================= FAVORITE =================
  const addToFavorite = async (item: any) => {
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
      }),
    });
  };

  // ================= ADD TO CART =================
  const addToCart = async (item: any) => {
    try {
      await fetch("/api/shoppingcart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: 1,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= SEARCH FILTER ================= */
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const totalPrice =
    selectedProduct
      ? selectedProduct.price * quantity
      : 0;

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        Our Products
      </h1>

      {/* ✅ SEARCH BAR ADDED */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page
          }}
          className="w-full max-w-md px-4 py-2 border rounded-xl shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {currentProducts.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
          >

            <div className="relative overflow-hidden">
              <img
                src={item.image}
                className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute right-3 top-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition">

                <button
                  onClick={() => addToFavorite(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition"
                >
                  <Heart size={18}/>
                </button>

                <button
                  onClick={() => {
                    setSelectedProduct(item);
                    setQuantity(1);
                  }}
                  className="bg-white p-2 rounded-full shadow hover:bg-blue-500 hover:text-white transition"
                >
                  <ReceiptText size={18}/>
                </button>

              </div>

              <span className="absolute left-3 top-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                SALE
              </span>
            </div>

            <div className="p-4">
              <h2 className="font-semibold text-lg truncate">
                {item.name}
              </h2>

              <p className="text-xl font-bold text-green-600 mt-2">
                ₹ {item.price}
              </p>
            </div>

            <button
              onClick={() => addToCart(item)}
              className="w-full mt-4 bg-gradient-to-r from-orange-400 to-pink-500
                         text-white py-2 rounded-lg font-semibold
                         transition-all duration-300
                         hover:scale-105 hover:shadow-xl
                         hover:from-pink-600 hover:to-red-500
                         active:scale-95"
            >
              Add To Cart
            </button>

          </div>
        ))}
      </div>

      {/* ✅ NO PRODUCTS MESSAGE */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found 😢
        </p>
      )}

      {/* ================= PAGINATION ================= */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center mt-12 gap-3 flex-wrap">

          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(p - 1, 1))
            }
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-pink-500 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, totalPages)
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Next
          </button>

        </div>
      )}

      {/* ================= PRODUCT MODAL ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl w-[90%] max-w-lg p-6 relative">

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-4 text-xl font-bold"
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              className="w-full h-64 object-cover rounded-xl"
            />

            <h2 className="text-2xl font-bold mt-4">
              {selectedProduct.name}
            </h2>

            <h2 className="text-1xl font-bold mt-4">
              {selectedProduct.description}
            </h2>

            <p className="text-2xl font-bold text-pink-600 mt-1">
              Price : ₹ {totalPrice}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-1 bg-gray-200 rounded-lg"
              >
                -
              </button>

              <span className="text-lg font-bold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-1 bg-gray-200 rounded-lg"
              >
                +
              </button>
            </div>

            <Link href="/orders">
              <button className="w-full mt-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
                Order Now
              </button>
            </Link>

            <button
              onClick={async () => {
                await fetch("/api/shoppingcart", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    productId: selectedProduct.id,
                    name: selectedProduct.name,
                    image: selectedProduct.image,
                    price: selectedProduct.price,
                    quantity: quantity,
                  }),
                });

                setSelectedProduct(null);
              }}
              className="w-full mt-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Add To Cart
            </button>

          </div>
        </div>
      )}

    </div>
  );
}



// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Heart, ReceiptText } from "lucide-react";

// export default function Shop() {

//   const [products, setProducts] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");

//   const productsPerPage = 8;

//   useEffect(() => {
//     fetch("/api/cartform")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   // ================= FAVORITE =================
//   const addToFavorite = async (item: any) => {
//     await fetch("/api/favorites", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         productId: item.id,
//         name: item.name,
//         image: item.image,
//         price: item.price,
//       }),
//     });
//   };

//   // ================= ADD TO CART =================
//   const addToCart = async (item: any) => {
//     try {
//       await fetch("/api/shoppingcart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           productId: item.id,
//           name: item.name,
//           image: item.image,
//           price: item.price,
//           quantity: 1,
//         }),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ================= PAGINATION =================
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;

//   const currentProducts = products.slice(
//     indexOfFirst,
//     indexOfLast
//   );

//   const totalPages = Math.ceil(
//     products.length / productsPerPage
//   );

  
//   const totalPrice =
//     selectedProduct
//       ? selectedProduct.price * quantity
//       : 0;

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">

//       <h1 className="text-3xl font-bold text-center mb-10">
//         Our Products
//       </h1>

//       {/* 🔍 SEARCH BAR */}
// <div className="flex justify-center mb-10">
//   <input
//     type="text"
//     placeholder="Search products..."
//     value={searchTerm}
//     onChange={(e) => {
//       setSearchTerm(e.target.value);
//       setCurrentPage(1); // reset to first page
//     }}
//     className="w-full max-w-md px-4 py-2 border rounded-xl shadow-sm
//                focus:outline-none focus:ring-2 focus:ring-pink-400"
//   />
// </div>

//       {/* ================= PRODUCTS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//         {currentProducts.map((item) => (
//           <div
//             key={item.id}
//             className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
//           >

//             <div className="relative overflow-hidden">
//               <img
//                 src={item.image}
//                 className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
//               />

//               <div className="absolute right-3 top-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition">

//                 <button
//                   onClick={() => addToFavorite(item)}
//                   className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition"
//                 >
//                   <Heart size={18}/>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSelectedProduct(item);
//                     setQuantity(1);
//                   }}
//                   className="bg-white p-2 rounded-full shadow hover:bg-blue-500 hover:text-white transition"
//                 >
//                   <ReceiptText size={18}/>
//                 </button>

//               </div>

//               <span className="absolute left-3 top-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
//                 SALE
//               </span>
//             </div>

//             <div className="p-4">
//               <h2 className="font-semibold text-lg truncate">
//                 {item.name}
//               </h2>

//               <p className="text-xl font-bold text-green-600 mt-2">
//                 ₹ {item.price}
//               </p>
//             </div>

//             <button
//               onClick={() => addToCart(item)}
//               className="
//                 w-full mt-4
//                 bg-gradient-to-r from-orange-400 to-pink-500
//                 text-white py-2 rounded-lg font-semibold
//                 transition-all duration-300
//                 hover:scale-105 hover:shadow-xl
//                 hover:from-pink-600 hover:to-red-500
//                 active:scale-95"
//             >
//               Add To Cart
//             </button>

//           </div>
//         ))}
//       </div>

//       {/* ================= PAGINATION ================= */}
//       <div className="flex justify-center mt-12 gap-3 flex-wrap">

//         <button
//           onClick={() =>
//             setCurrentPage((p) => Math.max(p - 1, 1))
//           }
//           className="px-4 py-2 bg-gray-200 rounded-lg"
//         >
//           Prev
//         </button>

//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentPage(index + 1)}
//             className={`px-4 py-2 rounded-lg ${
//               currentPage === index + 1
//                 ? "bg-pink-500 text-white"
//                 : "bg-white"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button
//           onClick={() =>
//             setCurrentPage((p) =>
//               Math.min(p + 1, totalPages)
//             )
//           }
//           className="px-4 py-2 bg-gray-200 rounded-lg"
//         >
//           Next
//         </button>

//       </div>

//       {/* ================= PRODUCT MODAL ================= */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

//           <div className="bg-white rounded-2xl w-[90%] max-w-lg p-6 relative animate-scaleIn">

//             <button
//               onClick={() => setSelectedProduct(null)}
//               className="absolute top-3 right-4 text-xl font-bold"
//             >
//               ✕
//             </button>

//             <img
//               src={selectedProduct.image}
//               className="w-full h-64 object-cover rounded-xl"
//             />

//             <h2 className="text-2xl font-bold mt-4">
//               {selectedProduct.name}
//             </h2>

//             <h2 className="text-1xl font-bold mt-4">
//               {selectedProduct.description}
//             </h2>

//             {/* ⭐ PRICE AUTO UPDATE */}
//             {/* <p className="text-green-600 text-xl font-semibold mt-2">
//               ₹ {selectedProduct.price} × {quantity}
//             </p> */}

//             <p className="text-2xl font-bold text-pink-600 mt-1">
//               Price : ₹ {totalPrice}
//             </p>

//             {/* QUANTITY */}
//             <div className="flex items-center gap-4 mt-6">

//               <button
//                 onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                 className="px-4 py-1 bg-gray-200 rounded-lg"
//               >
//                 -
//               </button>

//               <span className="text-lg font-bold">
//                 {quantity}
//               </span>

//               <button
//                 onClick={() => setQuantity(q => q + 1)}
//                 className="px-4 py-1 bg-gray-200 rounded-lg"
//               >
//                 +
//               </button>

//             </div>

//  <Link href="/orders">
//           <button   className="w-full mt-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3
//                rounded-xl font-semibold hover:scale-105 transition">
//   Order Now
// </button>
// </Link>


//             <button
//               onClick={async () => {
//                 await fetch("/api/shoppingcart", {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({
//                     productId: selectedProduct.id,
//                     name: selectedProduct.name,
//                     image: selectedProduct.image,
//                     price: selectedProduct.price,
//                     quantity: quantity,
//                   }),
//                 });

//                 setSelectedProduct(null);
//               }}
//               className="w-full mt-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3
//                rounded-xl font-semibold hover:scale-105 transition"
//             >
//               Add To Cart
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



