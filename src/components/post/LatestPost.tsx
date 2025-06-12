import { Row, Col, Card, Typography, Space, Divider, Image } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
const { Text } = Typography;

export default function LatestPost() {
  return (
    <>
      <Divider orientation="left">
        <Space>
          <ClockCircleOutlined />
          <Text strong>Latest News</Text>
        </Space>
      </Divider>

      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Col xs={24} sm={12} md={8} key={item}>
            <Card hoverable>
              <Card.Meta
                avatar={<Image preview={false} alt='Latest Post' src={`https://placehold.co/600x400`} width={80} />}
                title="News Headline"
                description="Brief news description"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}