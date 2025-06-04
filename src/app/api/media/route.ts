import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import { auth } from "next-auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "REPORTER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const articleId = Number(formData.get("articleId"));

  // Save file locally
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadsDir, fileName);
  await fs.writeFile(filePath, buffer);

  // Generate URL (assuming /public is served at /)
  const url = `/uploads/${fileName}`;

  // Optionally, get image dimensions if needed (requires extra library)
  let width = null;
  let height = null;
  if (file.type.startsWith("image")) {
    try {
      const sharp = (await import("sharp")).default;
      const metadata = await sharp(buffer).metadata();
      width = metadata.width ?? null;
      height = metadata.height ?? null;
    } catch {
      // sharp not installed or not an image
    }
  }

  await prisma.media.create({
    data: {
      url,
      type: file.type.startsWith("image")
        ? "IMAGE"
        : file.type.startsWith("video")
        ? "VIDEO"
        : "DOCUMENT",
      width,
      height,
      articleId,
    },
  });

  return NextResponse.json({ success: true, url });
}
