"use client";

import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [editOrder, setEditOrder] = useState<any>(null);

  const loadOrders = async () => {
    const res = await fetch("/api/orders", { cache: "no-store" });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // DELETE ORDER
  const handleDelete = async (id: number) => {
    await fetch("/api/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadOrders();
  };

  // UPDATE ORDER
  const handleUpdate = async () => {
    await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editOrder),
    });

    setEditOrder(null);
    loadOrders();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Checkout Orders
        </h2>

        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">City</th>
              <th className="p-3">State</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.full_name}</td>
                <td className="p-3">{order.email}</td>
                <td className="p-3">{order.phone}</td>
                <td className="p-3">{order.city}</td>
                <td className="p-3">{order.state}</td>
                <td className="p-3 font-semibold text-green-600">
                  {order.payment_method}
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setEditOrder(order)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No Orders Found
          </p>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {editOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-4 text-blue-700">
              Edit Order
            </h3>

            <div className="space-y-3">

              <input
                value={editOrder.full_name ?? ""}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, full_name: e.target.value })
                }
                placeholder="Full Name"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                value={editOrder.email ?? ""}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, email: e.target.value })
                }
                placeholder="Email"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                value={editOrder.phone ?? ""}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, phone: e.target.value })
                }
                placeholder="Phone"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                value={editOrder.city ?? ""}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, city: e.target.value })
                }
                placeholder="City"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                value={editOrder.state ?? ""}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, state: e.target.value })
                }
                placeholder="State"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                value={editOrder.payment_method ?? ""}
                onChange={(e) =>
                  setEditOrder({
                    ...editOrder,
                    payment_method: e.target.value,
                  })
                }
                placeholder="Payment Method"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="flex justify-between mt-5">
              <button
                onClick={() => setEditOrder(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




