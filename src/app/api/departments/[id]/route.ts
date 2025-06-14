import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const department = await prisma.department.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!department) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(department, { status: 200 });
  } catch (error) {
    console.error("Error fetching department:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name, description } = await request.json();

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const department = await prisma.department.update({
      where: { id: parseInt(id, 10) },
      data: { name, description },
    });

    return NextResponse.json(department, { status: 200 });
  } catch (error) {
    console.error("Error updating department:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const department = await prisma.department.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(department, { status: 200 });
  } catch (error) {
    console.error("Error deleting department:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
