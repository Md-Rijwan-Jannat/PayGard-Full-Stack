import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Document } from "@/models";
import mongoose from "mongoose";
import authOptions from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session: { user: { id: string; role: string } } | null =
    await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileUrl } = await req.json();

  await mongoose.connect(process.env.MONGODB_URI!);
  const document = new Document({
    fileUrl,
    userId: session.user.id,
  });
  await document.save();

  return NextResponse.json(document);
}

export async function GET(req: Request) {
  const session: { user: { id: string; role: string } } | null =
    await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  const documents =
    session.user.role === "admin"
      ? await Document.find()
      : await Document.find({ userId: session.user.id });

  return NextResponse.json(documents);
}
