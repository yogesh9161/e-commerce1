"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    payment_method: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.payment_method) {
      alert("Select payment method");
      return;
    }

    setLoading(true); 

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  // ............................ LOADING SCREEN ............................
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-6 text-lg font-semibold text-gray-700">
          Placing your order...
        </p>
      </div>
    );
  }

  // ............................ SUCCESS SCREEN ............................
  if (success) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center 
      bg-gradient-to-br from-green-50 to-green-100 p-6 text-center">
        
        {/* Tick Icon */}
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center
         animate-pulse">
          <svg
            className="w-14 h-14 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-green-600 mt-6">
          Order Placed Successfully!
        </h1>

        <button
          className="
            mt-8
            px-6 py-3
            rounded-full
            bg-gradient-to-r from-red-500 to-emerald-600
            text-white font-semibold
            transition-all duration-300
            hover:scale-105
            hover:shadow-xl
            active:scale-95
          "
          onClick={() => (window.location.href = "/shop")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ............................ FORM SCREEN ............................
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 sm:p-8">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="full_name"
            required
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              name="phone"
              required
              placeholder="Phone"
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <input
            name="address"
            required
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="city"
              required
              placeholder="City"
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              name="state"
              required
              placeholder="State"
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="pincode"
              required
              placeholder="Pincode"
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              name="country"
              required
              placeholder="Country"
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Payment Method</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="Online"
                  onChange={handleChange}
                />
                Online Payment
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="COD"
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-blue-600 text-white
              py-3 rounded-lg
              font-semibold
              hover:bg-blue-800
              transition duration-300
              hover:shadow-lg
            "
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}




