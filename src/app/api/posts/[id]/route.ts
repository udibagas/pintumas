import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { schema } from "@/validations/post.validation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "Department ID is required" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Department ID is required" },
      { status: 400 }
    );
  }

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

  const restData = vaidationResult.data;

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...restData,
        slug: restData.title.toLowerCase().replace(/\s+/g, "-").slice(0, 50),
        excerpt: restData.content.slice(0, 150),
        publishedAt: restData.published ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Department ID is required" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
