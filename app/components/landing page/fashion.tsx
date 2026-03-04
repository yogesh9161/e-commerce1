"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FashionNews() {

  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/cartform")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-4">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-red-500 tracking-[4px] text-sm font-semibold">
          LATEST NEWS
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mt-3">
          Fashion New Trends
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

        {blogs
          .slice(-3)        // ✅ Last 3 products only
          .reverse()        // ✅ Newest first
          .map((blog) => (
          <div key={blog.id} className="group">

            <div className="overflow-hidden">
              <img
              
                src={blog.image}
                alt={blog.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
                 
                  <p className="text-sm text-gray-500 mb-2">
                 16 February 2020
              </p>

              <h3 className="font-semibold text-lg mb-4">
                What Curling Irons Are The Best 
              </h3>

              {/* <h3 className="font-semibold text-lg mb-4">
               {blog.description}
               </h3>

                 <h3 className="font-semibold text-lg mb-4 text-red-500">
               {blog.price}
               </h3>
               */}
             

              <Link href={`/fashion/${blog.slug}`}>
                <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                  READ MORE
                </button>
              </Link>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}


// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function FashionNews() {

//   const [blogs, setBlogs] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/cartform")
//       .then((res) => res.json())
//       .then((data) => setBlogs(data));
//   }, []);

//   return (
//     <section className="bg-gray-100 py-16 px-4">
      
//       {/* Heading */}
//       <div className="text-center mb-12">
//         <p className="text-red-500 tracking-[4px] text-sm font-semibold">
//           LATEST NEWS
//         </p>

//         <h2 className="text-3xl md:text-4xl font-semibold mt-3">
//           Fashion New Trends
//         </h2>
//       </div>

//       <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

//         {blogs.map((blog) => (
//           <div key={blog.id} className="group">

//             <div className="overflow-hidden">
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
//               />
//             </div>

//             <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">

//                <p className="text-sm text-gray-500 mb-2">
//                 16 February 2020
//              </p>

//              <h3 className="font-semibold text-lg mb-4">
//                What Curling Irons Are The Best 
//              </h3>
              
             
//               <h3 className="font-semibold text-lg mb-4">
//                 {blog.title}
//               </h3>

//               <Link href={`/fashion/${blog.slug}`}>
//                 <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1
//                   after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//                   READ MORE
//                 </button>
//               </Link>

//             </div>

//           </div>
//         ))}

//       </div>
//     </section>
//   );
// }




