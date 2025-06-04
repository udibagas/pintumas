import PostCard from "@/components/post-card";
import prisma from "@/lib/prisma";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const data = await params;

  if (!data.slug) {
    return <div className="text-red-500">Post tidak ditemukan</div>;
  }

  await prisma?.post.update({
    where: { slug: data.slug },
    data: {
      viewCount: { increment: 1 }
    }
  });

  const post = await prisma?.post.findUnique({
    where: { slug: data.slug },
    include: {
      author: true,
      media: true,
      category: true
    }
  })

  if (!post) {
    return <div className="text-red-500">Post tidak ditemukan</div>;
  }



  return (
    <PostCard post={post} />
  )
}