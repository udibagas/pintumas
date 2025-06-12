import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
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

  const { title, content, excerpt } = await request.json();

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        content,
        excerpt,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
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
