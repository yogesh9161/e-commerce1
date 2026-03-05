import ContactForm from "@/components/contacts/contactform";
import Map from "@/components/contacts/map";

export default function ContactPage(){

 return(

<div>

{/* Map */}
<Map/>

<div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">

{/* Left Info */}
<div>
 <p className="text-red-500 tracking-widest">INFORMATION</p>

 <h1 className="text-4xl font-bold mt-2">
  Contact Us
 </h1>

 <p className="mt-4 text-gray-600">
  We pay strict attention to customer support.
 </p>

 <div className="mt-6 space-y-4">
  <h3 className="font-semibold">Sathyamangalam</h3>
  <p>12/3 North Cross Street Apm</p>

  <h3 className="font-semibold mt-4">Erode</h3>
  <p>109 Periyar Nagar Colony</p>
 </div>
</div>

{/* Right Form */}
<ContactForm/>

</div>

</div>
 );
}