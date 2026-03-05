export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

{/* .............................................kutty kid1................................... */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Kutty<span className="text-red-500"> Kid</span></h2>
          <p className="text-gray-400 leading-7">
            The customer is at the heart of our unique business model,
            which includes design and a quality-focused shopping experience.
          </p>
          <img src="/image/payment1.png" className="w-44 mt-4" />
        </div>

{/* .............................................shopping1............................................... */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shopping</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Clothing Store</li>
            <li className="hover:text-white cursor-pointer">Trending Shoes</li>
            <li className="hover:text-white cursor-pointer">Accessories</li>
            <li className="hover:text-white cursor-pointer">Sale</li>
          </ul>
        </div>

{/* ..............................................shopping2............................................ */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Payment Methods</li>
            <li className="hover:text-white cursor-pointer">Delivery</li>
            <li className="hover:text-white cursor-pointer">
              Return & Exchanges
            </li>
          </ul>
        </div>

{/*......................................................news................................................................... */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="text-gray-400 mb-4">
            Be the first to know about new arrivals, look books,
            sales & promos!
          </p>

        <div className="flex">
        <input type="email" placeholder="Your Email"
         className="w-full px-3 py-2 rounded-l-md text-white outline-none border border-white"/>
        <button className="bg-orange-600 px-4 py-2 rounded-r-md hover:bg-orange-800 transition"> Send</button>
          </div></div> </div>

    {/*..............................................................................................  */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        © Designed and created by <span className="text-red-700">YOGESH</span> !...... All rights reserved.
      </div>
    </footer>
  );
}