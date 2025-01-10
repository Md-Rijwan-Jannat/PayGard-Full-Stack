import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/route";
import { Payment } from "@/models";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const session: { user: { id: string; role: string } } | null =
    await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, amount } = await req.json();

  await mongoose.connect(process.env.MONGODB_URI!);
  const payment = new Payment({
    title,
    amount,
    userId: session.user.id,
  });
  await payment.save();

  return NextResponse.json(payment);
}

export async function GET(req: Request) {
  const session: { user: { id: string; role: string } } | null =
    await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  const payments =
    session.user.role === "admin"
      ? await Payment.find()
      : await Payment.find({ userId: session.user.id });

  return NextResponse.json(payments);
}
