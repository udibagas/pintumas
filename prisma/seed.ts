import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
const prisma = new PrismaClient();

async function seed() {
  // Create a default admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@mail.com" },
    update: {},
    create: {
      email: "admin@mail.com",
      name: "Admin User",
      role: "ADMIN",
      image: "https://placehold.co/100x100",
      password: hashSync("admin123", 10),
    },
  });

  // Create a default category
  const category = await prisma.category.upsert({
    where: { slug: "umum" },
    update: {},
    create: {
      name: "Umum",
      slug: "umum",
    },
  });

  await prisma.post.create({
    data: {
      title: "Contoh Artikel 1",
      slug: "contoh-artikel-1",
      content: "Ini adalah isi artikel contoh.",
      excerpt: "Ini adalah ringkasan artikel contoh.",
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: category.id,
      media: {
        create: [
          {
            url: "https://placehold.co/600x400",
            caption: "Gambar contoh",
            type: "IMAGE",
            width: 600,
            height: 400,
          },
        ],
      },
    },
  });
}

seed()
  .then(() => {
    console.log("Seeding completed successfully");
  })
  .catch((error) => {
    console.error("Seeding error", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
