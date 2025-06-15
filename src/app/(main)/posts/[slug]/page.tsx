// import PostCard from "@/components/post-card";
import Comments from "@/components/comments";
import Sidebar from "@/components/Sidebar";
// import PostAction from "@/components/post-action";
import prisma from "@/lib/prisma";
import { Divider, Image } from "antd";
import moment from "moment";

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
      PostMedia: { include: { media: true } },
      category: true,
      department: true,
    }
  })

  if (!post) {
    return <div className="text-red-500">Post tidak ditemukan</div>;
  }

  return (
    // <PostCard post={post} detail />
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <article className="w-full lg:w-2/3">
        <h1 className="text-3xl font-bold mb-2">Post Title</h1>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{post.author.name}</span>
          <Divider type="vertical" />
          <span>{moment(post.createdAt).format('DD-MMM-YYYY HH:mm')}</span>
          <Divider type="vertical" />
          <span>{post.category.name}</span>
        </div>
        <Image src={post.PostMedia[0].media.url} alt="" className="w-full rounded-lg mb-6" />
        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
        <div className="flex gap-2 mb-8">
          {/* Tags */}
        </div>
        <div className="flex gap-4 mb-8">
          {/* <PostAction post={post} /> */}
        </div>
        {/* Comments Section */}
        <section>
          {/* Comments list and form */}
          <Comments postId={post.id} />
        </section>
      </article>
      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 flex flex-col gap-8">
        {/* Related articles, latest news, newsletter, social links */}
        <Sidebar />
      </aside>
    </div>
  )
}