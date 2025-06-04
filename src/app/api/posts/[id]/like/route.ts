import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const data = await params;

  try {
    await prisma.post.update({
      where: { id: parseInt(data.id) },
      data: {
        likeCount: { increment: 1 },
      },
    });

    // await prisma.postLike.create({
    //   data: {
    //     postId: parseInt(data.id),
    //     userId: request.headers.get("user-id") || "anonymous", // Use a default user ID if not provided
    //   },
    // });
    return NextResponse.json({ message: "OK" }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error liking post:", error);
    return NextResponse.json(
      { message: "Gagal menyukai post" },
      { status: 500 }
    );
  }
}
