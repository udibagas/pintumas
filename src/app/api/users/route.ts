import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashSync } from "bcrypt";

export async function GET() {
  try {
    const categories = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { name, email, role, password } = await request.json();

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashSync(password, 10), // Hash the password before storing
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
