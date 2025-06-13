import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic"; // Ensure this route is always fresh

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;
    const search = searchParams.get("search") || "";

    const where = search
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
          media: true,
          category: true,
          department: true,
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
    const {
      title,
      content,
      authorId = "cmbhc6iz30000qww5bpfshhl1",
      categoryId = 1,
      published = false,
      featured = false,
    } = body;

    const schema = z.object({
      title: z.string().nonempty("Judul harus diisi"),
      content: z.string().nonempty("Konten harus diisi"),
      published: z.boolean().optional(),
      featured: z.boolean().optional(),
      authorId: z.string().optional(),
      categoryId: z.number().optional(),
    });

    const vaidationResult = schema.safeParse(body);

    if (!vaidationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: vaidationResult.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-").slice(0, 50),
        excerpt: content.slice(0, 150),
        published,
        publishedAt: published ? new Date() : null,
        featured,
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
