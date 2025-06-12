import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Category ID is required" },
      { status: 400 }
    );
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Category ID is required" },
      { status: 400 }
    );
  }

  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
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
      { message: "Category ID is required" },
      { status: 400 }
    );
  }

  try {
    const category = await prisma.category.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
