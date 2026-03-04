"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function ShoppingCartPage() {
  const [cart, setCart] = useState<any[]>([]);

  // ================= FETCH CART =================
  useEffect(() => {
    fetch("/api/shoppingcart", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  // ================= DELETE ITEM =================
  const deleteItem = async (id: number) => {
    const res = await fetch("/api/shoppingcart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (id: number, newQty: number) => {
    if (newQty < 1) return;

    const res = await fetch("/api/shoppingcart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, quantity: newQty }),
    });

    if (res.ok) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  // ================= TOTAL CART PRICE =================
  const totalPrice = cart.reduce(
    (total: number, item: any) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">

      <h1 className="text-4xl font-bold text-center mb-10">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-xl text-gray-500 font-medium">
            Your Cart is Empty
          </p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">

          {cart.map((item: any) => {

            // ✅ ITEM TOTAL PRICE CALCULATION
            const itemTotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className="
                flex flex-col sm:flex-row
                items-center gap-6
                bg-white
                rounded-2xl
                shadow-lg
                hover:shadow-2xl
                transition-all duration-300
                p-5"
              >
                {/* IMAGE */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  {/* SINGLE PRICE */}
                  {/* <p className="text-lg text-gray-500 mt-1">
                    ₹ {item.price} each
                  </p> */}

                  {/* ✅ TOTAL PRICE CHANGES WITH QUANTITY */}
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    ₹ {itemTotal}
                  </p>

                  {/* QUANTITY CONTROL */}
                  <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300"
                    >
                      −
                    </button>

                    <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="
                  flex items-center gap-2
                  bg-red-500 text-white
                  px-4 py-2
                  rounded-lg
                  hover:bg-red-600
                  transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}

          {/* TOTAL SECTION */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">

            <h2 className="text-xl font-semibold text-gray-600">
              Total Items : {cart.length}
            </h2>

            <h2 className="text-3xl font-bold text-green-600">
              Total Purchase : ₹ {totalPrice}
            </h2>

            <Link href="/orders">
              <button className="
                mt-4
                bg-gradient-to-r from-orange-400 to-pink-500
                text-white
                px-4 py-3
                rounded-xl
                font-semibold
                hover:scale-105
                transition
                shadow-lg">
                Proceed to Checkout
              </button>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
}




// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Trash2 } from "lucide-react";

// export default function ShoppingCartPage() {
//   const [cart, setCart] = useState<any[]>([]);

//   // FETCH CART DATA
//   useEffect(() => {
//     fetch("/api/shoppingcart", {
//       cache: "no-store",
//     })
//       .then((res) => res.json())
//       .then((data) => setCart(data));
//   }, []);

// // .............................................delete........................

// const deleteItem = async (id: number) => {

//   const res = await fetch("/api/shoppingcart", {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id }),
//   });

//   if (res.ok) {

//     setCart((prevCart) =>
//       prevCart.filter((item) => item.id !== id)
//     );
//   }
// };


//   // ..........................................delete................................

//   //..................................card price total panna................................ 
// const totalPrice = cart.reduce(
//   (total: number, item: any) =>
//     total + item.price * item.quantity,
//   0
// );

// //............................................end ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">

      
//       <h1 className="text-4xl font-bold text-center mb-10">
//          Shopping Cart
//       </h1>

    
//       {cart.length === 0 ? (
//         <div className="flex flex-col items-center justify-center mt-20">
//           <p className="text-xl text-gray-500 font-medium">
//             Your Cart is Empty 
//           </p>
//         </div>
//       ) : (

//         <div className="max-w-2xl mx-auto space-y-6">

//           {cart.map((item: any) => (
//             <div
//               key={item.id}
//               className="
//               flex flex-col sm:flex-row
//               items-center gap-6
//               bg-white
//               rounded-2xl
//               shadow-lg
//               hover:shadow-2xl
//               transition-all duration-300
//               p-5
//               "
//             >
              
//               <div className="overflow-hidden rounded-xl">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-32 h-32 object-cover hover:scale-110 transition duration-500"
//                 />
//               </div>

            
//               <div className="flex-1 text-center sm:text-left">
//                 <h2 className="text-xl font-semibold">
//                   {item.name}
//                 </h2>

//                 <p className="text-2xl font-bold text-green-600 mt-2">
//                   ₹ {item.price}
//                 </p>

              
//                 <div className="mt-3 inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full font-semibold">
//                   Quantity : {item.quantity}
//                 </div>
//               </div>

            
//               <button  onClick={() => deleteItem(item.id)}
//                 className="
//                 flex items-center gap-2
//                 bg-red-500 text-white
//                 px-4 py-2
//                 rounded-lg
//                 hover:bg-red-600
//                 transition
//                 "
//               >
//                 <Trash2 size={18} />
                
//               </button>
//             </div>
//           ))}

// {/*         
//           <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
//             <h2 className="text-2xl font-bold">
//               Total Items : {cart.length}
//             </h2> */}

//             <div className="bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">

//   <h2 className="text-xl font-semibold text-gray-600">
//     Total Items : {cart.length}
//   </h2>

  
//   <h2 className="text-3xl font-bold text-green-600">
//      Total Purchase : ₹ {totalPrice}
//   </h2>
//             <Link href="/orders">
//             <button
//               className="
//               mt-4
//               bg-gradient-to-r from-orange-400 to-pink-500
//               text-white
//               px-2 py-3
//               rounded-xl
//               font-semibold
//               hover:scale-105
//               transition
//               shadow-lg
//               "
//             >
//               Proceed to Checkout
//             </button>
//             </Link>
            
//           </div>

//         </div>
//       )}
//     </div>
//   );
// }




