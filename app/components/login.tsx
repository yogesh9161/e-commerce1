"use client";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const handleLogin = async (e:any) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const res = await fetch("/api/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });

    const data = await res.json();

    if(res.ok){
      localStorage.setItem("role", data.role);
      router.push("/");
    } else {
      alert("Login Failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-10 space-y-4">
      <input name="email" placeholder="Email" className="border p-2"/>
      <input name="password" type="password" placeholder="Password" className="border p-2"/>
      <button className="bg-blue-600 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}