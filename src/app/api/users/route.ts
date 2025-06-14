import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashSync } from "bcrypt";
import { schema } from "@/validations/user.validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const skip = (page - 1) * pageSize;
    const [rows, total] = await Promise.all([
      prisma.user.findMany({
        omit: { password: true },
        include: { department: true },
        orderBy: { name: "asc" },
        take: pageSize,
        skip,
      }),
      prisma.user.count(),
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
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashSync(validatedData.password!, 10),
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
