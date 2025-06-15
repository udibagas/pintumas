import { CategoryWithRelations } from "@/types";
import { Card, Divider, Image, Space, Typography } from "antd";
const { Text } = Typography;
import { TagsOutlined } from "@ant-design/icons";
import moment from "moment";
import { redirect } from "next/navigation";

export default function CategorySection({ category }: { category: CategoryWithRelations }) {
  return (
    <section>
      <Divider orientation="left">
        <Space>
          <TagsOutlined />
          <Text strong>{category.name}</Text>
        </Space>
      </Divider>
      <div className="flex gap-4 overflow-x-auto pb-2 flex-wrap">
        {category.posts?.map(post => (
          <Card
            hoverable
            onClick={() => redirect(`/posts/${post.slug}`)}
            key={post.id}
            style={{ width: 225 }}
            cover={
              <Image
                preview={false}
                width={225}
                alt="example"
                src={post.PostMedia?.[0]?.media?.url ?? `https://picsum.photos/225/150?random=${post.id}`}
                fallback={`https://picsum.photos/225/150?random=${post.id}`}
                className="rounded-t-md"
              />
            }
          >
            <Card.Meta
              title={<div title={post.title}>{post.title}</div>}
              description={
                <>
                  <div className='text-xs mb-2'>
                    {moment(post.publishedAt).format('DD-MMM-YY HH:mm')}
                  </div>
                  {/* <div className="line-clamp-2">{post.excerpt}</div> */}
                </>
              }
            />
          </Card>
        ))}
      </div>
    </section>
  );
}