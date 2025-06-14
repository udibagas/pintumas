import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashSync } from "bcrypt";
import { schema } from "@/validations/user.validation";

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
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
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
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...restData,
        password: restData.password
          ? hashSync(restData.password, 10)
          : undefined, // Hash the password if provided
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
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
    const user = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
