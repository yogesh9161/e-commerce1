"use client";

import Link from "next/dist/client/link";
import { useState, useEffect } from "react";

export default function HeroSlider() {

  
  const slides = [
    {
      id: 1,
      subtitle: "SUMMER COLLECTION",
      title: "Fall - Winter Collections 2030",
      desc: "A specialist label creating luxury essentials with exceptional quality.",
      image: "/image/h1.avif",
    },
    {
      id: 2,
      subtitle: "NEW ARRIVAL",
      title: "Modern Street Fashion",
      desc: "Discover modern outfits designed for comfort and style.",
      image: "/image/h2.avif",
    },
    {
      id: 3,
      subtitle: "TRENDING NOW",
      title: "Premium Fashion Wear",
      desc: "Ethically crafted collections for everyday elegance.",
      image: "/image/hero1.jpg",
    },
  ];

  
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  
  return (
    <section className="relative bg-gray-100 overflow-hidden">

      
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        min-h-[calc(100vh-80px)]
        flex
        flex-col-reverse
        md:flex-row
        items-center
        justify-center
        md:justify-between
        gap-10
      "
      >

    
        <div className="max-w-xl text-center md:text-left space-y-4">

          <p className="text-red-500 tracking-widest text-sm">
            {slide.subtitle}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {slide.title}
          </h1>

          <p className="text-gray-600 text-sm sm:text-base">
            {slide.desc}
          </p>
         <Link href="/shop">
          <button className="bg-black text-white px-6 py-3 mt-4 hover:bg-gray-800 transition">
            SHOP NOW →
          </button>
          </Link>
        </div>

        
        <div className="flex justify-center">
          <img
            src={slide.image}
            alt="fashion"
            className="
              w-[260px]
              sm:w-[320px]
              md:w-[420px]
              transition-all
              duration-700
              ease-in-out
            "
          />
        </div>
      </div>

      
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-2xl md:text-3xl"
      >
        ←
      </button>

    
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-2xl md:text-3xl"
      >
        →
      </button>

    </section>
  );
}







