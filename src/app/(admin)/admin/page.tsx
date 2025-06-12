'use client';

import {
  Card,
  Table,
  Tag,
  Statistic,
  Row,
  Col,
  Progress,
  List,
  Space,
  Typography,
  Button
} from 'antd';
import {
  EyeOutlined,
  ClockCircleOutlined,
  FireOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';

const { Text } = Typography;

// Mock data - replace with your actual data
const recentPosts = [
  {
    id: 1,
    title: 'Breaking News: Global Summit Concludes',
    category: 'Politics',
    views: 2453,
    comments: 42,
    status: 'published',
    date: '2023-06-15'
  },
  {
    id: 2,
    title: 'Tech Giant Unveils New Smartphone',
    category: 'Technology',
    views: 1892,
    comments: 31,
    status: 'published',
    date: '2023-06-14'
  },
  {
    id: 3,
    title: 'Sports Team Wins Championship',
    category: 'Sports',
    views: 3201,
    comments: 87,
    status: 'draft',
    date: '2023-06-14'
  },
  {
    id: 4,
    title: 'Health Breakthrough Announced',
    category: 'Health',
    views: 1542,
    comments: 23,
    status: 'published',
    date: '2023-06-13'
  },
];

const mostViewed = [
  {
    id: 101,
    title: 'Celebrity Wedding Photos Leaked',
    views: 12543,
    growth: 12.5
  },
  {
    id: 102,
    title: 'Stock Market Crash Analysis',
    views: 9872,
    growth: 8.2
  },
  {
    id: 103,
    title: 'New Movie Breaks Records',
    views: 8765,
    growth: -3.4
  },
  {
    id: 104,
    title: 'Climate Change Report',
    views: 7654,
    growth: 5.7
  },
];

const postColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Views',
    dataIndex: 'views',
    key: 'views',
    render: (views) => (
      <Space>
        <EyeOutlined />
        {views.toLocaleString()}
      </Space>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'published' ? 'green' : 'orange'}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} />
        <Button icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
];

const viewedColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Views',
    dataIndex: 'views',
    key: 'views',
    render: (views) => views.toLocaleString(),
  },
  {
    title: 'Growth',
    dataIndex: 'growth',
    key: 'growth',
    render: (growth) => (
      <Text type={growth > 0 ? 'success' : 'danger'}>
        {growth > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        {Math.abs(growth)}%
      </Text>
    ),
  },
];

export default function AdminDashboard() {
  return (
    <>
      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Posts"
              value={1254}
              prefix={<EditOutlined />}
            />
            <Progress percent={70} status="active" showInfo={false} />
            <Text type="secondary">12 new this week</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Views"
              value={89245}
              prefix={<EyeOutlined />}
            />
            <Progress percent={45} status="active" showInfo={false} />
            <Text type="secondary">24% up from last week</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={3421}
              prefix={<UserOutlined />}
            />
            <Progress percent={88} status="active" showInfo={false} />
            <Text type="secondary">8.2% up from last week</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Comments"
              value={1242}
              prefix={<UserOutlined />}
            />
            <Progress percent={30} status="active" showInfo={false} />
            <Text type="secondary">3.1% up from last week</Text>
          </Card>
        </Col>
      </Row>

      {/* Recent Posts */}
      <Card
        title={
          <Space>
            <ClockCircleOutlined />
            <Text strong>Recent Posts</Text>
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <Table
          columns={postColumns}
          dataSource={recentPosts}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Row gutter={16}>
        {/* Most Viewed Posts */}
        <Col span={12}>
          <Card
            title={
              <Space>
                <FireOutlined />
                <Text strong>Most Viewed Posts</Text>
              </Space>
            }
          >
            <Table
              columns={viewedColumns}
              dataSource={mostViewed}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col span={12}>
          {/* Activity Log */}
          <Card title="Recent Activity">
            <List
              size="small"
              dataSource={[
                'User "john_doe" commented on "Tech News"',
                'Post "Sports Update" published',
                'New category "Science" added',
                'User "jane_smith" registered',
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}