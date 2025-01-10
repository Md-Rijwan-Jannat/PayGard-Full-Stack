import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/route";
import { Document } from "@/models";
import mongoose from "mongoose";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session: { user?: { role?: string } } | null = await getServerSession(
    authOptions
  );
  if (!session || !session.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await req.json();

  await mongoose.connect(process.env.MONGODB_URI!);
  const document = await Document.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  return NextResponse.json(document);
}
