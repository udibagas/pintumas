'use client';

import { Divider, Space, Typography, Row, Col, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
const { Text } = Typography;


export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data.rows))
      .catch(error => console.error('Error fetching categories:', error));
  }, [])

  return (
    <>
      <Divider orientation="left">
        <Space>
          <StarOutlined />
          <Text strong>Kategori</Text>
        </Space>
      </Divider>

      <Row gutter={[16, 16]}>
        {categories.map((cat) => (
          <Col xs={24} sm={12} md={8} lg={4} key={cat.id}>
            <Button block size="large" href={`/categories/${cat.slug}`}>{cat.name}</Button>
          </Col>
        ))}
      </Row>
    </>
  )
}