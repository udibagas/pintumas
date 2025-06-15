import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        posts: {
          include: {
            author: true,
            category: true,
            department: true,
            PostMedia: { include: { media: true } },
          },
          take: 4,
        },
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured posts" },
      { status: 500 }
    );
  }
}
