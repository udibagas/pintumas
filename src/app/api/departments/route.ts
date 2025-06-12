import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * pageSize;
    const [rows, total] = await Promise.all([
      prisma.department.findMany({
        orderBy: {
          name: "asc",
        },
      }),
      prisma.department.count(),
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
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { name, description } = await request.json();

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const department = await prisma.department.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error("Error creating department:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
