"use client";
import { useState } from "react";

export default function ContactForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // ✅ success message

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setStatus(data.message);
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to send message ❌");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-lg rounded-xl p-6"
      >

        <h2 className="text-2xl font-bold text-center">
          Contact Us
        </h2>

        {/* ✅ Success Message inside form */}
        {status && (
          <p className="text-center text-green-600 font-medium">
            {status}
          </p>
        )}

        <input
          placeholder="Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Message"
          className="w-full border p-3 h-32 rounded"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          required
        />

        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
}