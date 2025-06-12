import { Card, Carousel, Image } from "antd";

export default function FeaturedPost() {
  return (
    <Carousel autoplay>
      {[1, 2, 3].map((item) => (
        <div key={item}>
          <Card
            hoverable
            cover={<Image preview={false} alt="featured news" src={`https://placehold.co/600x400`} />}
          >
            <Card.Meta
              title="Breaking News Headline"
              description="Short description of the featured news story"
            />
          </Card>
        </div>
      ))}
    </Carousel>
  )
}