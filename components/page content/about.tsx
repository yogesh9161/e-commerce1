export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">

      {/* Top Banner Image */}
      <div className="w-full h-[250px] md:h-[400px] lg:h-[600px] overflow-hidden rounded-lg mb-12">
        <img
          src="/image/about1.avif"
          className="w-full h-full object-cover"
          alt="about"
        />
      </div>

      {/* 3 Info Cards */}
      <div className="grid gap-10 text-center md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold mb-4">Who We Are ?</h2>
          <p className="text-gray-600 leading-7">
            Contextual advertising programs sometimes have strict policies
            that need to be adhered too.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Who We Do ?</h2>
          <p className="text-gray-600 leading-7">
            In this digital generation where information can be easily
            obtained within seconds.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 leading-7">
            A two or three storey house is the ideal way to maximise space.
          </p>
        </div>
      </div>

      {/* Image + Quote Section */}
      <div className="grid mt-20 gap-12 items-center bg-gray-100 p-6 rounded-lg lg:grid-cols-2">

        <div className="w-full h-[250px] md:h-[350px] overflow-hidden rounded-lg">
          <img
            src="/image/blog5.avif"
            alt="about"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center lg:text-left">
          <p className="text-lg italic text-gray-700 leading-8">
            “Going out after work? Take your butane curling iron with you
            to the office and style your hair before leaving.”
          </p>
        </div>
      </div>

    
      <div className="text-center mt-16">
        <p className="text-red-500 tracking-[4px] text-sm font-semibold">
          Our Team
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mt-3">
          Meet Our Team
        </h2>
      </div>

      
      <div className="grid gap-6 mt-10  grid-cols-1  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4">

    
        <div className="border rounded-lg p-3 text-center">
          <img src="/image/at1.jpg" className="w-full h-60 object-cover rounded-md" />
          <h2 className="mt-3 text-lg font-bold">Kutty</h2>
          <p className="text-sm text-gray-600">Fashion Designer</p>
        </div>

        <div className="border rounded-lg p-3 text-center">
          <img src="/image/at2.jpg" className="w-full h-60 object-cover rounded-md" />
          <h2 className="mt-3 text-lg font-bold">Kutty</h2>
          <p className="text-sm text-gray-600">Fashion Designer</p>
        </div>

        <div className="border rounded-lg p-3 text-center">
          <img src="/image/at3.jpg" className="w-full h-60 object-cover rounded-md" />
          <h2 className="mt-3 text-lg font-bold">Kutty</h2>
          <p className="text-sm text-gray-600">Fashion Designer</p>
        </div>

        <div className="border rounded-lg p-3 text-center">
          <img src="/image/at-4.jpg" className="w-full h-60 object-cover rounded-md" />
          <h2 className="mt-3 text-lg font-bold">Kutty</h2>
          <p className="text-sm text-gray-600">Fashion Designer</p>
        </div>

      </div>

    </section>
  );
}




