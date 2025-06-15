import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { schema } from "@/validations/post.validation";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic"; // Ensure this route is always fresh

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;
    const search = searchParams.get("search") || "";

    const where: Prisma.PostWhereInput = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { content: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [rows, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: true,
          category: true,
          department: true,
          PostMedia: { include: { media: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json(
      {
        rows,
        page,
        total,
        from: skip + 1,
        to: skip + rows.length,
      },
      { status: 200 }
    );
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
    const vaidationResult = schema.safeParse(body);

    if (!vaidationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: vaidationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = vaidationResult.data;

    // sementara ini kita gunakan user id statis
    const user = await prisma.user.findFirst();

    const post = await prisma.post.create({
      data: {
        ...validatedData,
        slug: validatedData.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .slice(0, 50),
        excerpt: validatedData.content.slice(0, 150),
        publishedAt: validatedData.published ? new Date() : null,
        authorId: user?.id || "1", // sementara
        PostMedia: { createMany: { data: body.PostMedia ?? [] } },
      },
      include: {
        author: true,
        category: true,
        department: true,
        PostMedia: { include: { media: true } },
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
