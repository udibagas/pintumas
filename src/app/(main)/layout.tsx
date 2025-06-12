'use client';

import { Layout, Row, Col, Typography, Button, Space } from 'antd';
import Link from 'next/link';
const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: '16px' }}>NewsPortal</Title>
          </Col>
          <Col>
            <Space size="large">
              <Button type="text">Home</Button>
              <Button type="text">Categories</Button>
              <Button type="text">Popular</Button>
              <Button type="text">About</Button>
              <Button type="primary">Subscribe</Button>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        <Space direction="vertical" size="middle">
          <Space size="large">
            <Link href='/about'>Tentang Kami</Link>
            <Link href='/contact'>Hubungi Kami</Link>
            <Link href='/privacy-policy'>Kebijakan Privasi</Link>
            <Link href='/terms-of-services'>Ketentuan Layanan</Link>
          </Space>
          <Text>©{new Date().getFullYear()} Pintumas</Text>
        </Space>
      </Footer>
    </Layout>
  );
}