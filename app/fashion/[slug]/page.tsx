import { Star } from "lucide-react";

async function getBlog(slug: string) {

  const res = await fetch("http://localhost:3000/api/cartform", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.find((item: any) => item.slug === slug);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;   // ✅ important

  const blog = await getBlog(slug);

  if (!blog) {
    return <div className="p-10 text-center">Blog Not Found</div>;
  }

  return (
    // <div className="max-w-5xl mx-auto p-10">

    //   <img
    //     src={blog.image}
    //     className="w-full h-[400px] object-cover rounded-lg mb-6"
    //   />

    //   <h1 className="text-4xl font-bold mb-4">
    //     {blog.name}
    //   </h1>

    //   <p className="text-red-500 text-xl mb-4">
    //     ₹{blog.price}
    //   </p>

    //   <p className="text-gray-600">
    //     {blog.description}
    //   </p>

    // </div>
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10">

  <div className="bg-white rounded-2xl shadow-lg overflow-hidden 
  hover:shadow-2xl transition duration-500">

    {/* IMAGE */}
    <div className="overflow-hidden">
      <img
        src={blog.image}
        alt={blog.name}
        className="w-full h-[250px] sm:h-[350px] md:h-[420px] object-cover 
        transition duration-500 hover:scale-105"
      />
    </div>

    {/* CONTENT */}
    <div className="p-6 md:p-8">

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 
      hover:text-red-500 transition duration-300">
        {blog.name}
      </h1>

      <p className="text-2xl font-semibold text-green-600 mb-1
      hover:scale-105 transition duration-300 inline-block">
        ₹{blog.price}
      </p>

      
              <p className="text-xl font-bold text-yellow-600 mt-1">
               <span className="flex flex-row items-start gap-1">
               <Star size={20}/><Star size={20}/><Star size={20}/>
              <Star size={20}/><Star size={20}/></span></p>

      <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
        {blog.description}
      </p>

    </div>

  </div>

</div>
  );
}