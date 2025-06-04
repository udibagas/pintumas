import PostCard from "@/components/post-card";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: true,
      media: true,
      category: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 10, // Limit to 10 posts for performance
  })

  console.log("Posts fetched:", posts);

  return (
    <div className="container mx-auto">
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
