"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

interface PaymentFormProps {
  onPaymentCreated: () => void;
}

export default function PaymentForm({ onPaymentCreated }: PaymentFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const res = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        amount: parseFloat(amount),
        paymentMethodId: paymentMethod.id,
      }),
    });

    if (res.ok) {
      toast.success("Payment created successfully");
      setTitle("");
      setAmount("");
      elements.getElement(CardElement)!.clear();
      onPaymentCreated();
    } else {
      toast.error("Failed to create payment");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="amount" className="block mb-1">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="card-element" className="block mb-1">
          Card Details
        </label>
        <CardElement id="card-element" className="p-3 border rounded" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Create Payment"}
      </button>
    </form>
  );
}
