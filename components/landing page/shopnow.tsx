"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function Shopnow() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/cartform", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-6">

      <h1 className="text-4xl font-bold text-center mb-16">
        Trending Products
      </h1>

      <div className="max-w-6xl mx-auto space-y-24">

        {products.slice(0, 4).map((item, index) => (
          <div
            key={item.id}
            className={`grid md:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >

          
            <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[350px] object-cover rounded-3xl shadow-xl 
                           transition duration-500 hover:scale-105"
              />
            </div>

          
            <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
              <h2 className="text-3xl font-semibold mb-6">
                {item.name}
              </h2>

              <p className="text-gray-600 mb-6">
                {item.description}
              </p>

              <p className="text-2xl font-bold text-pink-600 mb-8">
                ₹ {item.price}
              </p>
<Link href="/shop">
              <button className="bg-black text-white px-8 py-3 rounded-full
                                 transition-all duration-300
                                 hover:bg-pink-500 hover:scale-105">
                Shop Now
              </button>
              </Link>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}


