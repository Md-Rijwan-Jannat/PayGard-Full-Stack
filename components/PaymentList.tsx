"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Payment {
  _id: string;
  title: string;
  amount: number;
  status: string;
}

interface PaymentListProps {
  payments: Payment[];
  isAdmin: boolean;
}

export default function PaymentList({ payments, isAdmin }: PaymentListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updatePaymentStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const res = await fetch(`/api/payments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success("Payment status updated");
    } else {
      toast.error("Failed to update payment status");
    }
    setUpdatingId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            {isAdmin && (
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="px-6 py-4 whitespace-nowrap">{payment.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{payment.status}</td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => updatePaymentStatus(payment._id, "approved")}
                    disabled={
                      updatingId === payment._id ||
                      payment.status === "approved"
                    }
                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded disabled:bg-gray-400"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updatePaymentStatus(payment._id, "rejected")}
                    disabled={
                      updatingId === payment._id ||
                      payment.status === "rejected"
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:bg-gray-400"
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
