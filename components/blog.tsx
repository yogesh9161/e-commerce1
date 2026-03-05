"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogProduct() {

  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/cartform")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative h-[350px] w-full rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image/mainblog1.avif')" }}
        ></div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
          <h2 className="text-2xl font-bold mb-2">Blog Product</h2>
          <p>Latest fashion updates and product news.</p>
        </div>
      </div>

      {/* BLOG CARDS */}
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-16 px-4">

        {blogs.slice(0,9).map((blog) => (

          <div key={blog.id} className="group">

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={blog.image}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* CARD */}
            <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">

              <p className="text-sm text-gray-500 mb-2">
                16 February 2020
              </p>

              <h3 className="font-semibold text-lg mb-4">
                {blog.name}
              </h3>

              <p className="text-red-500 mb-3">
                ₹{blog.price}
              </p>

              <Link href={`/fashion/${blog.slug}`}>
                <button className="relative text-sm tracking-widest
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-black
                after:transition-all after:duration-300
                hover:after:w-full">
                  READ MORE
                </button>
              </Link>

            </div>

          </div>

        ))}

      </div>
    </>
  );
}



// export default function BlogProduct() {
//   return (
//     <>
    
//       <div className="relative h-[350px] w-full rounded-lg overflow-hidden">

        
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: "url('/image/mainblog1.avif')" }}
//         ></div>

    
//         <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
//           <h2 className="text-2xl font-bold mb-2">Blog Product</h2>
//           <p>Latest fashion updates and product news.</p>
//         </div>
//       </div>


//       <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-16 px-4">

    
//         <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog1.webp"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>

//            <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog2.avif"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>

//            <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog3.avif"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>

//            <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog4.avif"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>

//            <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog5.avif"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>

//            <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog6.avif"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>

//            <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog7.avif"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>

//            <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog8.avif"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>

//            <div className="group">
//           <div className="overflow-hidden">
//             <img src="/image/blog9.avif"
//         className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/> </div>
//          <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
//             <p className="text-sm text-gray-500 mb-2"> 16 February 2020 </p>
//              <h3 className="font-semibold text-lg mb-4">What Curling Irons Are The Best</h3>
//           <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
//         READ MORE</button>
//           </div></div>
         

//       </div>
//     </>
//   );
// }



// // export default function BlogProduct() {
// //   return (
// //     <div className="relative  h-[350px] w-full  rounded-lg overflow-hidden">
// //    <div className="absolute inset-0 bg-cover bg-center "style={{ backgroundImage: "url('/image/mainblog1.avif')" }}></div>
// //    <div className="relative z-10 p-6 text-white justify-center items-center flex flex-col h-full">
// //         <h2 className="text-xl font-bold mb-2">Blog Product</h2>
// //         <p>Latest fashion updates and product news.</p>
// // </div> 



// //     <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

// //         {/* CARD 1 */}
// //         <div className="group">
// //           <div className="overflow-hidden">
// //             <img
// //               src="/image/f2.avif"
// //               className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
// //             />
// //           </div>

// //           <div className="bg-white p-6 w-[90%] mx-auto -mt-12 relative shadow-md">
// //             <p className="text-sm text-gray-500 mb-2">
// //                16 February 2020
// //             </p>

// //             <h3 className="font-semibold text-lg mb-4">
// //               What Curling Irons Are The Best 
// //             </h3>

// // <button className="relative text-sm tracking-widest after:absolute after:left-0 after:-bottom-1
// //  after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
// //     READ MORE</button>
// //           </div>
// //         </div>

// //   </div> 
// //   </div>
// //   );
// // }