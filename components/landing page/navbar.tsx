"use client";

import Link from "next/link";
import { Heart, Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // ================= CART COUNT =================
  const loadCartCount = async () => {
    const res = await fetch("/api/shoppingcart", { cache: "no-store" });
    const data = await res.json();

    const total = data.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );

    setCartCount(total);
  };

  // ================= FAVORITE COUNT =================
  const loadFavoriteCount = async () => {
    const res = await fetch("/api/favorites", { cache: "no-store" });
    const data = await res.json();
    setFavCount(data.length);
  };

  useEffect(() => {
    loadCartCount();
    loadFavoriteCount();

    const interval = setInterval(() => {
      loadCartCount();
      loadFavoriteCount();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full bg-gray-50 shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          Kutty<span className="text-red-500">Kid</span>
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 font-medium text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/blog">Blog</Link></li>

          {/* Dropdown */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-yellow-400">
              Pages
            </span>

            <ul className="absolute left-0 top-full mt-3 w-48 bg-white shadow-lg rounded-md
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transition-all duration-300 z-50">

              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/about">About Us</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/services">Shop Details</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/shoppingcart">Shoppingcart</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/orders">Check Out</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/">Blog Details</Link>
              </li>
            </ul>
          </li>

          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* FAVORITES */}
          <Link href="/favorites" className="relative">
            <Heart size={22} />
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {favCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link href="/shoppingcart" className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN BUTTON - Hidden small screens */}
          <Link href="/auth" className="hidden sm:block">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-[600px] py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 text-lg bg-white">

          <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
          <li><Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
          <li><Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link href="/services" onClick={() => setMenuOpen(false)}>Shop Details</Link></li>
          <li><Link href="/shoppingcart" onClick={() => setMenuOpen(false)}>Shoppingcart</Link></li>
          <li><Link href="/orders" onClick={() => setMenuOpen(false)}>Check Out</Link></li>
          <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

          {/* LOGIN BUTTON FOR MOBILE */}
          <li className="sm:hidden">
            <Link href="/auth" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Login
              </button>
            </Link>
          </li>

        </ul>
      </div>

    </nav>
  );
}




// "use client";

// import Link from "next/link";
// import { Heart, Menu, ShoppingCart, X } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Navbar() {

//   const [cartCount, setCartCount] = useState(0);
//   const [favCount, setFavCount] = useState(0);
//     const [menuOpen, setMenuOpen] = useState(false);

//   // ✅ CART COUNT
//   const loadCartCount = async () => {
//     const res = await fetch("/api/shoppingcart", {
//       cache: "no-store",
//     });

//     const data = await res.json();

//     const total = data.reduce(
//       (sum: number, item: any) => sum + item.quantity,
//       0
//     );

//     setCartCount(total);
//   };

//   // ✅ FAVORITE COUNT
//   const loadFavoriteCount = async () => {
//     const res = await fetch("/api/favorites", {
//       cache: "no-store",
//     });

//     const data = await res.json();

//     // total favorites
//     setFavCount(data.length);
//   };

//   useEffect(() => {
//     loadCartCount();
//     loadFavoriteCount();

//     // auto refresh counts
//     const interval = setInterval(() => {
//       loadCartCount();
//       loadFavoriteCount();
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <nav className="w-full bg-gray-50 px-6 py-6">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">

//         {/* LOGO */}
//         <h1 className="text-3xl font-bold tracking-wide cursor-pointer">
//           Kutty<span className="text-red-500">Kid</span>
//         </h1>

// {/* MENU */}
// <ul className="hidden md:flex gap-10 font-medium text-lg">
//   <li><Link href="/">Home</Link></li>
//   <li><Link href="/shop">Shop</Link></li>
//   <li><Link href="/blog">Blog</Link></li>

//   {/* Pages Dropdown */}
//   <li className="relative group">
//     <h1 className="hover:text-yellow-400 transition"> Pages </h1>

//     {/* Dropdown */}
//     <ul className="absolute  z-30 left-0 top-full mt-3 w-48 bg-white text-black shadow-lg rounded-md
//                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                  transition-all duration-300">

//       <li className="px-4 py-2 hover:bg-gray-100">
//         <Link href="/about">About Us</Link>
//       </li>

//       <li className="px-4 py-2 hover:bg-gray-100">
//         <Link href="/services">Shop Details</Link>
//       </li>

//       <li className="px-4 py-2 hover:bg-gray-100">
//         <Link href="/shoppingcart">Shoppingcart</Link>
//       </li>

//       <li className="px-4 py-2 hover:bg-gray-100">
//         <Link href="/orders">Check Out</Link>
//       </li>

//       <li className="px-4 py-2 hover:bg-gray-100">
//         <Link href="/">Blog Details</Link>
//       </li>

//     </ul>
//   </li>

//   <li><Link href="/contact">Contact</Link></li>
// </ul>

//         {/* RIGHT ICONS */}
//         <div className="flex items-center gap-6">

      
//           <Link
//             href="/favorites"
//             className="relative hover:text-yellow-400 transition"
//           >
//             <Heart size={24} />

//             {favCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
//                 {favCount}
//               </span>
//             )}
//           </Link>

        
//           <Link
//             href="/shoppingcart"
//             className="relative hover:text-yellow-400 transition"
//           >
//             <ShoppingCart size={24} />

//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

// <Link href="/auth">
//  <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700
//  hover:shadow-lg transition duration-300 ease-in-out"> Login </button>
// </Link>

//  <button
//             className="md:hidden"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-500 ${
//           menuOpen ? "max-h-[500px] mt-5" : "max-h-0"
//         }`}
//       >
//         <ul className="flex flex-col gap-4 bg-white p-5 rounded-lg shadow-lg text-lg">

//           <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
//           <li><Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
//           <li><Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
//           <li><Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
//           <li><Link href="/services" onClick={() => setMenuOpen(false)}>Shop Details</Link></li>
//           <li><Link href="/shoppingcart" onClick={() => setMenuOpen(false)}>Shoppingcart</Link></li>
//           <li><Link href="/orders" onClick={() => setMenuOpen(false)}>Check Out</Link></li>
//           <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

//         </ul>
//       </div>
//     </nav>
    
    
//   );
// }


