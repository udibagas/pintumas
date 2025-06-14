import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { schema } from "@/validations/category.validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const skip = (page - 1) * pageSize;
    const [rows, total] = await Promise.all([
      prisma.category.findMany({
        orderBy: { name: "asc" },
        take: pageSize,
        skip,
      }),
      prisma.category.count(),
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
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

  try {
    const category = await prisma.category.create({
      data: {
        ...validatedData,
        slug: validatedData.name.toLowerCase().replace(/\s+/g, "-"),
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
