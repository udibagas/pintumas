import { Divider, Space, Typography, List, Image } from "antd";
const { Text } = Typography;
import { FireOutlined } from "@ant-design/icons";

export default function PopularPost() {
  return (
    <>
      <Divider orientation="left">
        <Space>
          <FireOutlined />
          <Text strong>Trending Now</Text>
        </Space>
      </Divider>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={[1, 2, 3]}
        renderItem={(item) => (
          <List.Item
            key={item}
            extra={<Image preview={false} width={272} alt="trending news" src={`https://placehold.co/600x400`} />}
          >
            <List.Item.Meta
              title={<a href="#">Trending News Headline {item}</a>}
              description="Detailed description of the trending news article with more content"
            />
            Content excerpt from the news article...
          </List.Item>
        )}
      />
    </>
  );
}