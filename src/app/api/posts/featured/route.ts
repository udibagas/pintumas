import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        category: true,
        department: true,
        PostMedia: { include: { media: true } },
      },
      orderBy: { viewCount: "desc" },
      take: 5,
      where: {
        featured: true,
        published: true,
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured posts" },
      { status: 500 }
    );
  }
}
