import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    if (!postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }

    const id = parseInt(postId, 10);
    if (isNaN(id)) {
      return new NextResponse("Invalid Post ID", { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { postId: id },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/posts/:id/comments:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
