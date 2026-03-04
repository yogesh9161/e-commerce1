export default function InstagramSection() {
  return (
    <section className="bg-gray-100 py-12 px-4">
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE - IMAGE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
          <img src="/image/c1.avif" className="w-full h-60 object-cover rounded-pill-md" />
          <img src="/image/c2.avif" className="w-full h-60 object-cover rounded-pill-md" />
          <img src="/image/c3.avif" className="w-full h-60 object-cover rounded-pill-md" />
          <img src="/image/c4.avif" className="w-full h-60 object-cover rounded-pill-md" />
          <img src="/image/c5.avif" className="w-full h-60 object-cover rounded-pill-md" />
          <img src="/image/c6.avif" className="w-full h-60 object-cover rounded-pill-md" />
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div className="text-center lg:text-left space-y-6">
          <h2 className="text-3xl font-semibold">Instagram</h2>

          <p className="text-gray-600 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h3 className="text-red-500 text-2xl font-semibold">
            #Kutty_Kid
          </h3>
        </div>

      </div>
    </section>
  );
}