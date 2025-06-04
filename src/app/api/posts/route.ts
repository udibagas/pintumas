import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Ensure this route is always fresh

// Todo: implement pagination
export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: true,
        media: true,
        category: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 10,
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      authorId = "cmbhc6iz30000qww5bpfshhl1",
      categoryId = 1,
    } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-").slice(0, 50),
        excerpt: content.slice(0, 150),
        published: true,
        publishedAt: new Date(),
        content,
        authorId,
        categoryId,
      },
      include: {
        author: true,
        media: true,
        category: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
