



"use client";

import Link from "next/link";
import { BookUser, LayoutDashboard, ShoppingBasket, Users } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 ">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-8 ">
        <h1 className="text-2xl font-bold text-center">Admin Panel</h1>

        <nav className="space-y-6 mt-10">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 hover:text-yellow-400 transition"
          >
            <LayoutDashboard size={20} />
            Product Carts
          </Link>

          {/* <Link
            href="/dashboard/cartform"
            className="flex items-center gap-3 hover:text-yellow-400 transition"
          >
            <ShoppingBasket size={20} />
            Add Product
          </Link> */}
 
           
<Link href="/dashboard/users" className="flex items-center gap-3 hover:text-yellow-400 transition">
  <Users size={20} /> Users</Link>


  <Link href="/dashboard/orders"
  className="flex items-center gap-3 hover:text-yellow-400 transition">
  <BookUser size={20} /> Checkout Orders</Link>

       <Link href="/auth"
  className="flex items-center gap-3 hover:text-yellow-400 transition">
  <BookUser size={20} /> Log Out</Link>
  

        </nav>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}