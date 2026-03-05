import Image from "next/image";
import Navbar from "../components/landing page/navbar";                                                         
import Hero from "../components/landing page/hero";      
import  Shopnow  from "../components/landing page/shopnow";

import  Category from "../components/landing page/category";
import Fashion from "../components/landing page/fashion";
// import  Footer  from "./components/landing page/footer";
// import About from "./components/page content/about";
// import Shopcart from "./components/shop/shopcart";
// import Cartform from "./components/cartform";
// import Shoppingcart from "./components/shoppingcart";
// import Shop from "./components/shop";
// import Blog from "./components/blog";

export default function Home() {
  return (
   <div>
    {/* <Navbar/> */}
    <Hero/>
    <Shopnow/>
  
    <Category/>
    <Fashion/>
    {/* <Footer/> */}
    {/* <Blog/> */}
    {/* <About/> */}
    {/* <Shopcart/> */}
    {/* <Cartform/> */}
    {/* <Shop/> */}
    {/* <Shoppingcart/> */}
    
  
   </div>
  );
}
