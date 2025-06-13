import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id, 10);

    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/posts/:id/comments:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
