import { CategoryWithRelations } from "@/types";
import { Divider, Image, Space, Typography } from "antd";
import Link from "next/link";
const { Text } = Typography;

export default function CategorySection({ category }: { category: CategoryWithRelations }) {
  return (
    <section>
      <Divider orientation="left">
        <Space>
          <Text strong>{category.name}</Text>
        </Space>
      </Divider>
      <div className="flex gap-4 overflow-x-auto pb-2 flex-wrap">
        {category.posts?.map(post => (
          <div key={post.id} className="min-w-[220px] bg-white rounded shadow p-4">
            <Image
              preview={false} src={post.PostMedia?.[0].media.url ?? `https://picsum.photos/600/400?random=${post.id}`}
              alt=""
              className="object-cover rounded mb-2"
              width={180}
              height={90}
              fallback={`https://picsum.photos/600/400?random=${post.id}`}
            />
            <h3 className="font-semibold text-sm line-clamp-1">{post.title}</h3>
            <Link href={`/posts/${post.slug}`} className="text-yellow-600 text-xs hover:underline">Read More</Link>
          </div>
        ))}
      </div>
    </section>
  );
}