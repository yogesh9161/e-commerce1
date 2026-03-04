"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [editUser, setEditUser] = useState<any>(null);

  const loadUsers = async () => {
    const res = await fetch("/api/users", { cache: "no-store" });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ESC CLOSE
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") setEditUser(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ........................................DELETE PANDRATHUKU......................................
  const handleDelete = async (id: number) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadUsers();
  };

  // ..........................................UPDATE PANDRATHUKU..............................
  const handleUpdate = async () => {
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUser),
    });

    setEditUser(null);
    loadUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Registered Users
        </h2>

        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setEditUser(user)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No Users Found
          </p>
        )}
      </div>

{/*....................................... edit design............................... */}
{editUser && (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
  onClick={() => setEditUser(null)} >
        
 <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl animate-scaleIn"
  onClick={(e) => e.stopPropagation()}>
    
 <div className="flex justify-between items-center mb-4">
   <h3 className="text-xl font-bold text-blue-700"> Edit User</h3>

<button onClick={() => setEditUser(null)}><X size={20} /></button>
</div>

          
<div className="space-y-3">
<input value={editUser.name} onChange={(e) =>setEditUser({ ...editUser, name: e.target.value })}
className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"/>

<input value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
 className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" />
</div>

{/* ........................................button style.......................................... */}
 <div className="flex justify-between mt-6">
    <button onClick={() => setEditUser(null)}
      className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
    <button onClick={handleUpdate}
       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"> Update</button>
            </div>
          </div>
        </div>
      )}

  {/* .....................................animation style ku......................... */}
      <style jsx>{`
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-in-out;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
{/* .................................................................................. */}
    </div>
  );
}




