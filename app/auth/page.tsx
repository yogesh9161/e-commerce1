"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false); // ✅ Login first
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const url = isRegister ? "/api/register" : "/api/login";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      if (isRegister) {
        // alert("Registered Successfully Please Login");
        // setIsRegister(false); 
      } else {
        // alert("Login Successful");
        router.push("/dashboard");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Register" : " Admin Login"}
        </h1>

        {/* Register Name Field */}
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-4 p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* Toggle Option */}
        <p
          className="text-center mt-4 text-blue-600 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {/* {isRegister
            ? "Already have account? Login"
            : "Don't have account? Register"} */}
            

        </p>
      </div>
    </div>
  );
}




