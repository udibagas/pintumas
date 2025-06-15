import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });

    const posts = await prisma.post.findMany({
      include: {
        author: true,
        category: true,
        department: true,
        PostMedia: { include: { media: true } },
      },
      orderBy: { published: "desc" },
      take: 5,
      where: {
        published: true,
        // related = same category or department, or tags
        OR: [
          { categoryId: post.categoryId },
          { departmentId: post.departmentId },
        ],
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch  posts" },
      { status: 500 }
    );
  }
}
