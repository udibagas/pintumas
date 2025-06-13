import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { content: { contains: search, mode: "insensitive" as const } },
            {
              author: {
                name: { contains: search, mode: "insensitive" as const },
              },
            },
            {
              post: {
                title: { contains: search, mode: "insensitive" as const },
              },
            },
          ],
        }
      : {};

    const skip = (page - 1) * pageSize;
    const [rows, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: { author: true, post: true },
        take: pageSize,
        skip,
      }),
      prisma.comment.count({ where }),
    ]);

    return NextResponse.json(
      {
        rows,
        total,
        from: skip + 1,
        to: skip + rows.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { postId, content } = await req.json();

    if (!postId || !content) {
      return new NextResponse("Post ID and content are required", {
        status: 400,
      });
    }

    const id = parseInt(postId, 10);
    if (isNaN(id)) {
      return new NextResponse("Invalid Post ID", { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: id,
      },
    });

    await prisma.post.update({
      where: { id: postId },
      data: {
        commentCount: { increment: 1 },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/comment:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
