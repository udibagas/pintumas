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
  await prisma.category.upsert({
    where: { slug: "umum" },
    update: {},
    create: {
      name: "Umum",
      slug: "umum",
    },
  });

  try {
    await prisma.category.createMany({
      data: [
        {
          name: "Berita",
          slug: "berita",
        },
        {
          name: "Pengumuman",
          slug: "pengumuman",
        },
        {
          name: "Regulasi",
          slug: "regulasi",
        },
        {
          name: "Publikasi",
          slug: "publikasi",
        },
      ],
    });
  } catch (error) {
    console.error("Error during seeding categegory:", error);
  }

  const post = {
    title: "Lorem ipsum dolor sit amet",
    slug: "lorem-ipsum-dolor-sit-amet",
    content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  for (let i = 10; i < 20; i++) {
    await prisma.post.create({
      data: {
        title: `${post.title} - ${i + 1}`,
        slug: `${post.slug}-${i + 1}`,
        content:
          post.content + `\n\nThis is additional content for post ${i + 1}.`,
        excerpt: post.excerpt + ` This is an excerpt for post ${i + 1}.`,
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: Math.floor(Math.random() * 5) + 1, // Random category ID between 1 and 5
        featured: i % 2 === 0, // Set featured for even indexed posts
        media: {
          create: [
            {
              url: "https://picsum.photos/600/400?random=" + i,
              caption: `Gambar contoh ${i + 1}`,
              type: "IMAGE",
              width: 600,
              height: 400,
            },
          ],
        },
      },
    });
  }
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
